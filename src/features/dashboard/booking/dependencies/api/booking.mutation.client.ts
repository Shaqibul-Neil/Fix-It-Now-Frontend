import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { TCreateBookingForm } from "../schema/booking.schema";
import type { IUpdateBookingStatusPayload } from "../types/booking.types";

//-----------------Technician---------------
export const updateBookingStatus = (
  id: string,
  payload: IUpdateBookingStatusPayload,
) =>
  clientFetch<{ id: string }>(apiEndpoints.technician.bookingStatus(id), {
    method: "PATCH",
    body: payload,
  });

//-----------------Customer---------------
export const createBooking = (payload: TCreateBookingForm) =>
  clientFetch<{ id: string }>(apiEndpoints.customer.bookings, {
    method: "POST",
    body: payload,
  });

export const cancelBooking = (id: string) =>
  clientFetch<{ id: string }>(apiEndpoints.customer.cancelBooking(id), {
    method: "PATCH",
  });

export const createPaymentSession = (bookingId: string) =>
  clientFetch<{ paymentUrl: string }>(apiEndpoints.customer.createPayment, {
    method: "POST",
    body: { bookingId },
  });
