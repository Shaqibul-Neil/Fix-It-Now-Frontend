# API Integration Map

How every Express API endpoint reaches the screen. Base URL comes from `API_URL`
(server-side only). The browser calls `/api/gateway/<path>`; the proxy forwards
to `<API_URL>/<path>` with the access token attached.

Paths below are written as the backend registers them, without the `/api` prefix.

**Legend** — ✅ wired · ⛔ not wired · ➖ not a frontend concern

---

## Request path

| Layer | File | Used by |
|---|---|---|
| Client fetcher | `src/lib/api/api.client.ts` | every TanStack Query hook |
| Server fetcher | `src/lib/api/api.server.ts` | Server Components, BFF handlers |
| Endpoint registry | `src/lib/api/api.endpoint.ts` | both |
| Proxy | `src/app/api/gateway/[...path]/route.ts` | all client traffic |
| Auth handlers | `src/app/api/auth/{login,register,logout}/route.ts` | login, register, logout |

---

## Auth

| Method | Endpoint | Frontend | Consumer |
|---|---|---|---|
| POST | `/auth/register` | `/api/auth/register` handler | `features/auth` register form |
| POST | `/auth/login` | `/api/auth/login` handler | `features/auth` login form |
| POST | `/auth/refresh-token` | `api.server` refresh flow | transparent to the UI |
| GET | `/auth/me` | `auth.service.ts → getMeRequest` | dashboard layout, onboarding guard, public pages needing the viewer |

Status: ✅ all four.

---

## Technicians

| Method | Endpoint | Hook / caller | Screen |
|---|---|---|---|
| GET | `/technicians` | `public/technician/…/technician.api.ts` | `/technicians`, home technician section |
| GET | `/technicians/:id` | same | `/technicians/[id]` |
| GET | `/technicians/:id/availability` | same | `/technicians/[id]`, booking panel |
| POST | `/technicians/profile` | `onboarding/…/onboarding.service.ts` | `/onboarding` |
| PATCH | `/technicians/profile` | technician profile mutation | `/dashboard/technician/profile` |
| GET | `/technicians/profile/me` | technician profile query | same |
| GET | `/technicians/admin/list` | `useAdminTechniciansQuery` | `/dashboard/admin/technicians` |
| GET | `/technicians/admin/:id` | `useAdminTechnicianDetailsQuery` | `/dashboard/admin/technicians/[id]` |
| PATCH | `/technicians/admin/:id/approval` | `useReviewTechnicianMutation` | approval modal, list + details |
| PATCH | `/technicians/profile/availability` | ⛔ | superseded by `PUT /technician/availability` |

Notes — the admin list is filtered by `search`, `city`, `minRating`,
`approvalStatus` (tabs) and `accountStatus` (select, where `all` sends
`includeDeleted=true`). `bio` arrives as `string[]`, one entry per paragraph.

---

## Availability

| Method | Endpoint | Hook | Screen |
|---|---|---|---|
| GET | `/technician/availability` | availability query | `/dashboard/technician/availability` |
| PUT | `/technician/availability` | availability mutation | same (replaces the whole week) |

---

## Categories

| Method | Endpoint | Hook | Screen |
|---|---|---|---|
| GET | `/categories` | `public/…/category` api | `/categories`, service filters |
| GET | `/admin/categories` | `useAdminCategoriesQuery` | `/dashboard/admin/categories` |
| POST | `/admin/categories` | `useCreateCategoryMutation` | category form panel |
| GET | `/admin/categories/:id` | `useAdminCategoryDetailsQuery` | `/dashboard/admin/categories/[id]` |
| PATCH | `/admin/categories/:id` | `useUpdateCategoryMutation` | form panel |
| PATCH | `/admin/categories/:id/restore` | `useRestoreCategoryMutation` | list + details |
| DELETE | `/admin/categories/:id` | `useDeleteCategoryMutation` | list + details |

Status: ✅ all seven.

---

## Services

| Method | Endpoint | Hook | Screen |
|---|---|---|---|
| GET | `/services` | public service api / customer service query | `/services`, home, `/dashboard/customer/services` |
| GET | `/technician/services/my-services` | `useTechnicianServicesQuery` | `/dashboard/technician/services` |
| POST | `/services` | `useCreateServiceMutation` | service form panel |
| PATCH | `/services/:id` | `useUpdateServiceMutation` | service form panel |
| PATCH | `/services/:id/restore` | `useRestoreServiceMutation` | technician + admin tables |
| DELETE | `/services/:id` | `useDeleteServiceMutation` | technician + admin tables |
| GET | `/services/admin/list` | `useAdminServicesQuery` | `/dashboard/admin/services` |
| GET | `/services/admin/:id` | ⛔ | no admin service-details page |

A listing that is off is **paused**, never "inactive": `isDeleted ? DELETED :
isActive ? ACTIVE : PAUSED` in every table that renders one.

---

## Bookings

| Method | Endpoint | Hook | Screen |
|---|---|---|---|
| POST | `/bookings` | `useCreateBookingMutation` | booking panel on public pages |
| GET | `/bookings` | `useCustomerBookingsQuery` | `/dashboard/customer/bookings` |
| GET | `/bookings/:id` | role details queries | all three `bookings/[id]` pages |
| PATCH | `/bookings/:id/cancel` | `useCancelBookingMutation` | customer list + details |
| GET | `/technician/bookings` | `useTechnicianBookingsQuery` | `/dashboard/technician/jobs` |
| PATCH | `/technician/bookings/:id` | `useUpdateBookingStatusMutation` | status modal |
| GET | `/admin/bookings` | `useAdminBookingsQuery` | `/dashboard/admin/bookings` |

Status: ✅ all seven.

---

## Payments

| Method | Endpoint | Hook | Screen |
|---|---|---|---|
| POST | `/payments/create` | `useCreatePaymentMutation` | customer booking details → gateway redirect |
| GET | `/payments/my-payments` | `useCustomerPaymentsQuery` | `/dashboard/customer/payments` |
| GET | `/payments/:id` | payment details query | `payments/[id]`, `transactions/[id]` |
| GET | `/admin/payments` | `useAdminPaymentsQuery` | `/dashboard/admin/transactions` |
| POST | `/payments/success` `/fail` `/cancel` `/ipn` | ➖ | SSLCommerz → API, server to server. The browser lands on `(public)/payment/{success,fail,cancel}` |

---

## Reviews

| Method | Endpoint | Hook | Screen |
|---|---|---|---|
| GET | `/reviews/my-reviews` | `useCustomerReviewsQuery` | `/dashboard/customer/reviews` |
| POST | `/reviews` | `useCreateReviewMutation` | review form panel |
| PATCH | `/reviews/:id` | `useUpdateReviewMutation` | review form panel |
| DELETE | `/reviews/:id` | `useDeleteReviewMutation` | customer + admin tables |
| GET | `/technician/reviews` | `useTechnicianReviewsQuery` | `/dashboard/technician/reviews` |
| GET | `/admin/reviews` | `useAdminReviewsQuery` | `/dashboard/admin/reviews` |
| PATCH | `/admin/reviews/:id/status` | `useModerateReviewMutation` | moderation modal |
| GET | `/technicians/:id/reviews` | ⛔ | would replace the embedded five reviews on the admin technician details page with a real paginated table |

Shape notes — both parties carry `avatar`. `/technician/reviews` is served by the
public mapper, so its `comment` is `string[]` (paragraphs); the customer and
admin lists return `comment` as a plain string.

Column order — admin: reviewer → technician → service → rating → comment → date
→ status. Customer: technician → service → …. Technician: customer → service → ….

---

## Users (admin)

| Method | Endpoint | Hook | Screen |
|---|---|---|---|
| GET | `/admin/users` | `useAdminUsersQuery` | `/dashboard/admin/users` |
| PATCH | `/admin/users/:id` | `useUpdateUserStatusMutation` | ban / reinstate — user + technician tables |
| PATCH | `/admin/users/:id/restore` | `useRestoreUserMutation` | same |
| DELETE | `/admin/users/:id` | `useDeleteUserMutation` | same |

These act on the account, which is why technician rows carry `userId`.

---

## Customer profile

| Method | Endpoint | Status |
|---|---|---|
| GET | `/customer/profile/me` | ⛔ page exists at `/dashboard/customer/profile`, no query |
| PATCH | `/customer/profile` | ⛔ same |

---

## Notifications

| Method | Endpoint | Hook | Screen |
|---|---|---|---|
| GET | `/notifications` | `useNotificationsQuery(isRead?)` | `NotificationBell` in the dashboard navbar |
| PATCH | `/notifications/:id/read` | `useMarkNotificationReadMutation` | clicking an unread row |
| PATCH | `/notifications/read-all` | `useMarkAllNotificationsReadMutation` | "Mark all read" |
| GET | `/notifications/unread-count` | ⛔ by design | the list response already returns `unreadCount` |

Behaviour — the bell polls every 60s, "Unread" is a server filter
(`isRead=false`), and the badge count comes from the list payload. The `data`
field on a notification (`{ target, bookingId | reviewId | userId | serviceId }`)
is typed but not yet turned into deep links, because the destination differs per
role.

---

## Stats

| Method | Endpoint | Hook | Screen |
|---|---|---|---|
| GET | `/stats/admin/dashboard` | admin overview query | `/dashboard/admin` |
| GET | `/stats/technician/dashboard` | technician overview query | `/dashboard/technician` |
| GET | `/stats/admin/dashboard/last-five-bookings` | ⛔ | — |
| GET | `/stats/technician/dashboard/recent-requests` | ⛔ | — |
| — | customer stats | ⛔ backend side | `customerStatsRoute` registers `routes: []`, so `/dashboard/customer` has nothing to render |

---

## Summary

| | Count |
|---|---|
| Endpoints registered | 68 |
| Wired | 56 |
| Not wired | 8 |
| Not a frontend concern | 4 (payment gateway callbacks) |

Backlog, in the order worth doing:

1. `GET /technicians/:id/reviews` — paginated reviews on the admin technician page and a reviews section on the public profile.
2. Customer profile — `GET /customer/profile/me` + `PATCH /customer/profile`.
3. Customer dashboard stats — needs the backend route first.
4. Dashboard "recent" widgets (`last-five-bookings`, `recent-requests`).
5. `GET /services/admin/:id` — an admin service-details page.
6. Retire `PATCH /technicians/profile/availability` on the backend, or drop the availabilitySlot route. Two endpoints for one job.
