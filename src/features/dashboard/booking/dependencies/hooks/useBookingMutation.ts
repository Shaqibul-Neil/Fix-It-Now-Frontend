"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppToast } from "@/src/lib/utils/toast.utils";
import { bookingKeys } from "../api/booking.key";
import {
  cancelBooking,
  createBooking,
  createPaymentSession,
  updateBookingStatus,
} from "../api/booking.mutation.client";
import type { IUpdateBookingStatusPayload } from "../types/booking.types";

// One booking is on three dashboards at once, so every write drops all three
// role caches. Passing the id also refreshes an open details page.
const useInvalidateBooking = () => {
  const queryClient = useQueryClient();

  return (id?: string) => {
    const keys = [
      bookingKeys.admin.lists,
      bookingKeys.technician.lists,
      bookingKeys.customer.lists,
      ...(id
        ? [
            bookingKeys.admin.details(id),
            bookingKeys.technician.details(id),
            bookingKeys.customer.details(id),
          ]
        : []),
    ];

    return Promise.all(
      keys.map((queryKey) => queryClient.invalidateQueries({ queryKey })),
    );
  };
};

//-----------------Technician---------------
export const useUpdateBookingStatusMutation = (onDone?: () => void) => {
  const invalidateBooking = useInvalidateBooking();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateBookingStatusPayload;
    }) => updateBookingStatus(id, payload),

    onSuccess: async ({ message }, { id }) => {
      await invalidateBooking(id);
      AppToast.success(message ?? "Booking status updated");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

//-----------------Customer---------------
export const useCreateBookingMutation = (onDone?: () => void) => {
  const invalidateBooking = useInvalidateBooking();

  return useMutation({
    mutationFn: createBooking,

    onSuccess: async ({ message }) => {
      await invalidateBooking();
      AppToast.success(message ?? "Booking placed");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

export const useCancelBookingMutation = (onDone?: () => void) => {
  const invalidateBooking = useInvalidateBooking();

  return useMutation({
    mutationFn: cancelBooking,

    onSuccess: async ({ message }, id) => {
      await invalidateBooking(id);
      AppToast.success(message ?? "Booking cancelled");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

// No invalidation — the gateway redirect leaves the app entirely.
export const useCreatePaymentMutation = () =>
  useMutation({
    mutationFn: createPaymentSession,

    onSuccess: ({ data }) => {
      if (!data?.paymentUrl) {
        AppToast.error("Payment session could not be started");
        return;
      }
      window.location.href = data.paymentUrl;
    },
    onError: AppToast.error,
  });
