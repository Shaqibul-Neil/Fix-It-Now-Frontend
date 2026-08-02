# FixItNow — Frontend

Home-services marketplace. Customers book vetted technicians, technicians manage
listings and jobs, admins moderate the whole platform.

**Live:** https://fix-it-now-frontend-alpha.vercel.app

This repository is the Next.js frontend. It talks to the FixItNow Express API
through its own Backend-for-Frontend proxy — the browser never calls the API
directly and never holds a token.

---

## Table of contents

- [Stack](#stack)
- [Getting started](#getting-started)
- [Environment](#environment)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Authentication](#authentication)
- [Data fetching](#data-fetching)
- [Conventions](#conventions)
- [Challenges and how they were solved](#challenges-and-how-they-were-solved)
- [API integration](#api-integration)
- [License](#license)

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, `class-variance-authority`, `tailwind-merge` |
| Server state | TanStack Query 5 |
| Tables | TanStack Table 8 |
| Forms | React Hook Form + Zod 4 |
| Charts | Recharts 3 |
| Motion | GSAP |
| Toasts | Sonner |
| Primitives | Radix UI, lucide-react |

---

## Getting started

Requirements: Node.js 20+, a running FixItNow API.

```bash
git clone <repository-url>
cd fix-it-now-frontend
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000
```

---

## Environment

| Variable | Required | Example | Purpose |
|---|---|---|---|
| `API_URL` | yes | `http://localhost:5000/api` | Express API base. **Server-side only** — never prefixed with `NEXT_PUBLIC_`, so it is never shipped to the browser |
| `NEXT_PUBLIC_APP_URL` | yes | `http://localhost:3000` | Public origin, used for absolute URLs and payment redirects |

Cookie names, TTLs and the proxy base paths live in `src/lib/config/config.ts`.

---

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

---

## Architecture

```
Browser ──▶ Next.js route handlers (BFF) ──▶ Express API
   │              │
   │              └── reads the httpOnly access-token cookie and forwards it
   └── never sees a token, never calls the API host directly
```

Three ways data moves:

1. **Server Components** call `serverFetch` directly (public pages: home,
   services, technicians). Rendered on the server, no client bundle cost.
2. **Client Components** call `clientFetch` through TanStack Query. `clientFetch`
   only ever hits `/api/gateway/*` — the catch-all proxy at
   `src/app/api/gateway/[...path]/route.ts` — which attaches the access token and
   forwards to the API unchanged.
3. **Auth** has its own handlers under `/api/auth/*` because those are the routes
   that mint and clear cookies. The generic proxy explicitly refuses `auth/*` so
   a token route can never be reached through it.

---

## Project structure

```
src/
├── app/
│   ├── (auth)/              login, register, forgot-password, onboarding
│   ├── (dashboard)/         admin | technician | customer, role-gated
│   ├── (public)/            marketing + browse + payment result pages
│   └── api/
│       ├── auth/            login, register, logout (cookie handling)
│       └── gateway/[...path] BFF proxy to the Express API
├── components/
│   ├── common/              generic UI — never imports a domain type
│   ├── shared/              app furniture: sidebar, navbar, notifications
│   ├── ui/                  Radix-based primitives
│   └── index.ts             the single import surface for both
├── features/
│   ├── dashboard/<module>/  booking, category, notification, payment, review,
│   │   ├── dependencies/    service, technician, user, availability, overview
│   │   │   ├── api/         endpoint callers + query keys
│   │   │   ├── components/  filters, panels, modals
│   │   │   ├── hooks/       useXQuery.ts / useXMutation.ts
│   │   │   ├── schema/      Zod schemas
│   │   │   ├── table/       column factories
│   │   │   └── types/
│   │   └── pages/           the component a route renders
│   ├── public/              home, service, technician (RSC data)
│   ├── auth/
│   └── onboarding/
├── hooks/                   useServerPagination — the URL is the table state
├── lib/
│   ├── api/                 clientFetch, serverFetch, endpoints, errors
│   ├── auth/                roles, cookies, guards
│   ├── options/             filter option groups, chart colours
│   └── utils/               formatting, cn, toasts
└── types/                   cross-cutting types
```

---

## Authentication

- Access and refresh tokens are stored in `httpOnly`, `sameSite=lax` cookies
  (`secure` in production). No token ever touches `localStorage`.
- The gateway rejects any request without an access token with `401`.
- A technician who has not finished onboarding is redirected out of the
  dashboard into `/onboarding`; roles are enforced in the layouts.

---

## Data fetching

- **Query keys** live in `<module>.key.ts`. `lists` is the prefix a mutation
  invalidates; `list(query)` is the exact key.
- **Table state lives in the URL.** `useServerPagination` reads `page`, `limit`
  and every filter from the query string, so a filtered table is a shareable
  link. Setting a filter to `undefined` removes the parameter, and the sentinel
  `ALL` is treated as "no filter" on read, so a bookmarked `?status=ALL` cannot
  reach the API.
- **Pagination is always server-side.** `meta` carries `{ page, limit, total }`;
  there is no `totalPages`.
- Mutations invalidate every list their write can be seen in, then toast.

---

## Conventions

- Feature modules never import each other's internals except through their
  public files; generic components in `src/components/common` never import a
  domain type.
- One flat status union renders every pill (`StatusPill`), one filter option
  config feeds every select and tab (`src/lib/options/filter.options.ts`).
- Comments explain *why*, not *what*.
- Before a commit: `npx tsc --noEmit`, `npm run lint`, `npx prettier --write`.

---

## Challenges and how they were solved

### 1. Keeping the access token out of the browser — the BFF layer

**The problem.** The Express API authenticates with a bearer token. The usual
React answer is to keep that token in `localStorage` and attach it to every
request, but anything in `localStorage` is readable by any script on the page,
so a single XSS anywhere in the app hands over a live session. Storing it in an
`httpOnly` cookie fixes that — except then client-side code cannot read it to
attach it, and the cookie belongs to the Next.js origin, not to the API origin,
so the browser will not send it there either.

**The approach.** The browser stops talking to the API altogether. Every client
request goes to a Backend-for-Frontend proxy that lives inside this app —
a catch-all route handler at `src/app/api/gateway/[...path]/route.ts`. It reads
the `httpOnly` cookie on the server, attaches the token, forwards the request to
`API_URL`, and returns the API's response untouched:

```ts
// src/lib/api/api.client.ts — the only base URL a client component ever sees
baseUrl = config.gateway_base_url;   // "/api/gateway"
```

`API_URL` is deliberately **not** prefixed with `NEXT_PUBLIC_`, so the API host
never ships in the client bundle.

**What went wrong along the way.** A generic proxy will forward anything —
including the login and refresh routes, which is exactly how a token could have
leaked back out through the very layer meant to contain it. The proxy now
refuses the auth namespace outright:

```ts
const BLOCKED_BFF_ROUTES = ["auth"];
```

Login, register and logout get their own handlers under `/api/auth/*`, because
those are the only routes allowed to mint or clear cookies. Everything else goes
through the proxy, which means adding a new endpoint costs one line in the
endpoint registry and no proxy work at all.

---

### 2. Making the URL the single source of table state

**The problem.** Every dashboard table has pagination plus three to five
filters. Holding those in `useState` meant the same values existed twice — once
in component state, once inside the TanStack Query key — and a filtered table
could not be linked, bookmarked or reached with the back button.

**The approach.** `useServerPagination` reads and writes the query string
instead, and the query hooks read the same URL:

```ts
const { page, pageSize, getFilter, setFilter } = useServerPagination();
// setFilter(key, undefined) removes the parameter and resets to page 1
```

There is no local filter state anywhere. The URL *is* the state, so the query
key changes when the URL changes and a shared link reproduces the exact view.

**The bug this created.** Selects use a sentinel value, `ALL`, to mean "no
filter". Clicking a tab mapped `ALL` to `undefined` correctly, but nothing
sanitised the URL on **load** — so a stale or shared
`?approvalStatus=ALL` sent the literal string to the API, and the backend enum
rejected it:

```
"query.approvalStatus": Invalid option: expected one of "PENDING"|"APPROVED"|"REJECTED"
```

Fixing it at the five call sites would have left the same trap for the next
filter added. The fix went one level down, into the reader, so every table in
the app inherits it:

```ts
// "ALL" is the UI's word for no filter — a bookmarked one must not reach the API.
getFilter: (key) => {
  const value = searchParams.get(key);
  return value && value !== ALL_OPTION_VALUE ? value : undefined;
},
```

---

### 3. Type definitions that quietly disagreed with the API

**The problem.** Frontend response types are written by hand, which means
`tsc` will happily verify the whole app against a shape the server never sends.
Two fields were doing exactly that. The backend runs `toParagraphs()` on
technician bios and on public review comments, so those fields arrive as
`string[]`, one entry per paragraph — but they were typed `string | null`.
Nothing failed. React just rendered the array with the paragraphs jammed
together into one wall of text, and the type checker stayed silent because the
lie was in the declaration itself.

**The approach.** The backend mapper is the contract, not the type file. Reading
`technician.mapper.ts` and `review.mapper.ts` turned up both cases, plus avatars
that had been added to the review payload and were never displayed. The types
were corrected to `string[]`, the pages render the paragraphs, and the review
tables now show the avatars that were already being sent.

**The rule that came out of it.** When a screen looks subtly wrong and the types
say it cannot be, the types are the suspect. Before typing a response, read the
mapper that produces it.

---

### 4. One status vocabulary for eight modules

**The problem.** Bookings, payments, reviews, accounts, technician applications
and soft-deleted rows all render a status pill, in dozens of places. Left alone
this becomes a colour map per module and the same concept named differently in
each. It had already started: the frontend had invented `INACTIVE` for a listing
that was switched off, while the backend calls that state **paused** — so the
table and the filter tab disagreed about the same row.

**The approach.** One flat `TStatus` union and one `STATUS_META` record of
`{ label, tone }`, with six tones. A new status is one row in that map, not a
new type and not a new colour decision.

**Making the rename safe.** `INACTIVE` was deleted from the union outright
rather than aliased to `PAUSED`. Removing it turned every remaining usage into a
compile error, so `tsc` produced the exact list of five call sites to migrate —
a compiler-generated checklist instead of a hopeful grep. The same edit exposed
a second issue: an approved application rendered in the same green as an active
account, so the two pills sitting side by side read as one fact. Approved is now
brass.

---

### 5. Reusing table code across three roles without leaking domain types

**The problem.** Admin, technician and customer each get their own reviews
table, services table and bookings table. The columns overlap by roughly
seventy percent, but the actions differ completely — a technician can neither
edit nor moderate a review, an admin can do both. Copying the columns three
times meant every change had to be made three times; a single component driven
by a `role` prop meant every role's logic ending up in one file.

**The approach.** Shared columns are exported as factories, and each role
composes what it needs:

```tsx
const [service, ...rest] = reviewBaseColumns<IAdminReviewRow>();
// reviewer, technician, service, ...rest, status, actions
```

Actions are data — `{ icon, label, variant, hidden, onClick }` — so a role's
table hides what it cannot do with a predicate instead of a branch, and the
`hidden` predicates compose. The technician list uses that to fold in a rule of
its own: while an application is pending, the account actions disappear, because
banning an account nobody has ruled on yet is the wrong move.

The constraint that keeps this from rotting: nothing in `src/components` imports
a domain type. `ContactColumn` takes `{ name, email?, avatar? }`, not a user;
`StatusPill` takes a status string, not a booking. Generic components stay
generic, and the domain lives in the feature modules.

---

### Smaller ones worth recording

- **Half stars.** A 4.5 average rendered as four stars because the call sites
  rounded before display. `AppRating` now draws a filled star clipped to the
  fractional width over an empty one, and scores snap to the nearest half so a
  4.3 does not render a confusing sliver.
- **Two fetchers, one registry.** Public pages are Server Components using
  `serverFetch`; dashboards are client components using TanStack Query and
  `clientFetch`. Both read the same `apiEndpoints` object, so an endpoint is
  defined once no matter which side calls it.
- **Cache invalidation across modules.** Writing a review changes three review
  lists *and* the booking row's "already reviewed" marker, so review mutations
  invalidate the booking keys too. Query keys are grouped as
  `lists` (the prefix a mutation drops) and `list(query)` (the exact key) to make
  that cheap to express.

---

## API integration

Endpoint-by-endpoint mapping of API routes to the modules and components that
call them, plus the routes that are not wired yet, lives in
[API_INTEGRATION.md](./API_INTEGRATION.md).

---

## License

Proprietary — **All Rights Reserved**. See [LICENSE](./LICENSE).

This source code is published for viewing and evaluation only. You may not
copy, reuse, modify, redistribute or deploy it, in whole or in part, without
prior written permission from the copyright holder.
