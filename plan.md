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

## Cancel window + refund — decided 2026-07-31, backend work is a later phase

### The cancel window is already right

`CUSTOMER_CANCELABLE = [REQUESTED, ACCEPTED, PAID]` in `booking.constants.ts`.
Anything from `IN_PROGRESS` onward returns 400. Nothing to change here.

| Status | Cancel allowed | Money |
|---|---|---|
| REQUESTED | yes | nothing taken |
| ACCEPTED | yes | nothing taken |
| PAID | yes | **taken — a refund is owed** |
| IN_PROGRESS | no — the technician is already on the job | — |
| COMPLETED | no | — |
| DECLINED / CANCELLED | no | — |

### The hole

`cancelBooking` flips the booking to `CANCELLED` and stops. It never touches
the Payment row, so a paid booking's payment stays `SUCCESS`: the customer has
paid, has no service, and nothing in the system records that money is owed
back. `TPaymentStatus.REFUNDED` exists in the enum and is never written.

### Backend work, in the order it has to happen

1. **`Payment` schema.**
   - `bankTranId String? @map("bank_tran_id")`. The SSLCommerz refund API keys
     off `bank_tran_id`, not `tran_id`. It arrives on the success callback and
     is **not stored today** — every payment taken before this column exists is
     unrefundable through the gateway. This is the blocking item.
   - `refundedAt DateTime?`, `refundAmount Decimal?`, `refundReason String?`,
     `refundRef String?` for the gateway's own refund reference.
   - Enum: add `REFUND_PENDING` between `SUCCESS` and `REFUNDED`. A gateway
     refund is not instant, so a lone `REFUNDED` flag would lie for the days
     in between.

2. **`finalizePayment` stores `bank_tran_id`** from the validation response
   next to `valId`. One line, but nothing else can be built before it.

3. **`cancelBooking` branches on paid.** Put the cancel in a transaction: if a
   `SUCCESS` payment exists for the booking, write that payment to
   `REFUND_PENDING` and notify the admin in the same unit of work. An unpaid
   cancel keeps behaving exactly as it does now.

4. **New route — `PATCH /admin/payments/:id/refund` (ADMIN).** Body
   `{ amount?, reason? }`. Guards: the payment is `REFUND_PENDING`, the
   booking is `CANCELLED`, `bankTranId` is present, and the amount does not
   exceed what was paid. Calls the gateway refund endpoint, then writes
   `REFUNDED` plus the refund fields. Idempotent on re-call, same as
   `finalizePayment` is.

   Admin-approved rather than auto-refund on cancel: a gateway call inside a
   customer-triggered request fails in ways the customer cannot act on, and a
   refund queue is what a support team actually wants.

5. **Refund window policy** — one constant in `booking.constants.ts`: full
   refund when cancelled more than N hours before `scheduledAt`, a
   cancellation fee otherwise. Simplest first version: always full refund.

### Frontend work once that lands

- `ConfirmModal` on a `PAID` cancel says something different — the amount paid
  and "a refund will be started". Unpaid cancels keep the current copy.
- `StatusPill` already renders `REFUNDED`; add `REFUND_PENDING` to
  `STATUS_META` and to `FILTER_OPTIONS.paymentStatus`.
- Admin transactions table gets a **Refund** row action opening a
  `ConfirmModal` with a reason box, visible only while the row is
  `REFUND_PENDING`.
- Customer payment details grows a refund block (amount, date, reference) that
  renders once `refundedAt` is set.

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
