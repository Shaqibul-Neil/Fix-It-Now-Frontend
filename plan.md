# FixItNow frontend — working plan

Living document. Current phase is the **booking module**; the parked ideas at the
bottom are deliberately not being built yet.

---

## Decisions locked on 2026-07-30

| Question | Decision |
|---|---|
| Pay now visibility | Shown for `REQUESTED` **and** `ACCEPTED` only. `ACCEPTED` → payment session. `REQUESTED` → modal "Waiting for the technician to accept". Every other status hides the button. |
| Booking creation entry | "New booking" on the customer bookings page **navigates to the services page**. The booking form opens from a service card, so `serviceId`, title and price are already in hand — no second fetch, and the customer picks a service by name, not by id. |
| Table filter + paging state | URL searchParams (`?status=&search=&page=&limit=`), same as the dashboard filter. `useServerPagination` is written against searchParams, not `useState`. |
| Data flow | browser → TanStack Query → BFF gateway (`/api/gateway/*`) → Express. Unchanged from the dashboard. |

## Backend contract this phase depends on

```
POST   /bookings                     CUSTOMER    create
PATCH  /bookings/:id/cancel          CUSTOMER    cancel (REQUESTED | ACCEPTED | PAID only)
GET    /bookings                     CUSTOMER    own list
GET    /bookings/:id                 any role    details (include shape varies by role)
GET    /technician/bookings          TECHNICIAN  own list
PATCH  /technician/bookings/:id      TECHNICIAN  status update
GET    /admin/bookings               ADMIN       all bookings
POST   /payments/create              CUSTOMER    { bookingId } → gateway session
```

List query: `?status=&category=&search=&page=&limit=` (`limit` max 100).
List meta: `{ page, limit, total }` — **no `totalPages`**, compute it.

Status transitions the technician may drive:

```
REQUESTED  → ACCEPTED | DECLINED
PAID       → IN_PROGRESS
IN_PROGRESS→ COMPLETED
```

Anything else returns 400, so the status modal only offers the moves that are
legal for the row's current status.

---

## Parked ideas (not now)

- **"Retake this service"** on a `COMPLETED` booking — one click re-opens the
  booking form with the same `serviceId`, address and notes prefilled, only the
  schedule blank. Good repeat-business affordance and cheap to add once the
  booking form takes an initial-values prop. Build it after the booking module
  is finished end to end.
- **Booking category filter** — the list endpoint accepts `category`, but the
  category module is not built yet, so the filter is status + search only for
  now.
- **Review prompt after completion** — the review module is a later phase; a
  completed booking should eventually surface "Rate this technician".
