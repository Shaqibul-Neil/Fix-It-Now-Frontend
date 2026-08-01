import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { TCreateBookingForm } from "../schema/booking.schema";
import type { IUpdateBookingStatusPayload } from "../types/booking.types";

//-----------------Technician---------------
export const updateBookingStatus = (
  id: string,
  payload: IUpdateBookingStatusPayload,
) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.technician.bookings.status(id),
    {
      method: "PATCH",
      body: payload,
    },
  );

//-----------------Customer---------------
export const createBooking = (payload: TCreateBookingForm) =>
  clientFetch<{ id: string }>(apiEndpoints.dashboard.customer.bookings.create, {
    method: "POST",
    body: payload,
  });

export const cancelBooking = (id: string) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.customer.bookings.cancel(id),
    {
      method: "PATCH",
    },
  );

export const createPaymentSession = (bookingId: string) =>
  clientFetch<{ paymentUrl: string }>(
    apiEndpoints.dashboard.customer.payments.create,
    {
      method: "POST",
      body: { bookingId },
    },
  );
