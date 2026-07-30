"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppToast } from "@/src/lib/utils/toast.utils";
import { bookingKeys } from "@/src/features/dashboard/booking/dependencies/api/booking.key";
import type { TReviewStatus } from "@/src/types/types";
import { reviewKeys } from "../api/review.key";
import {
  createReview,
  deleteReview,
  moderateReview,
  updateReview,
} from "../api/review.mutation.client";
import type {
  ICreateReviewPayload,
  IUpdateReviewPayload,
} from "../types/review.types";

// A review shows up on three dashboards and also flips the booking row's
// "already reviewed" marker, so every write drops the booking caches too.
const useInvalidateReview = () => {
  const queryClient = useQueryClient();

  return (bookingId?: string) => {
    const keys = [
      reviewKeys.admin.lists,
      reviewKeys.technician.lists,
      reviewKeys.customer.lists,
      bookingKeys.customer.lists,
      ...(bookingId ? [bookingKeys.customer.details(bookingId)] : []),
    ];

    return Promise.all(
      keys.map((queryKey) => queryClient.invalidateQueries({ queryKey })),
    );
  };
};

//-----------------Customer---------------
export const useCreateReviewMutation = (onDone?: () => void) => {
  const invalidateReview = useInvalidateReview();

  return useMutation({
    mutationFn: createReview,

    onSuccess: async ({ message }, payload: ICreateReviewPayload) => {
      await invalidateReview(payload.bookingId);
      AppToast.success(message ?? "Review submitted");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

export const useUpdateReviewMutation = (onDone?: () => void) => {
  const invalidateReview = useInvalidateReview();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateReviewPayload;
    }) => updateReview(id, payload),

    onSuccess: async ({ message }) => {
      await invalidateReview();
      AppToast.success(message ?? "Review updated");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

//-----------------Customer (own) + Admin (any)---------------
export const useDeleteReviewMutation = (onDone?: () => void) => {
  const invalidateReview = useInvalidateReview();

  return useMutation({
    mutationFn: deleteReview,

    onSuccess: async ({ message }) => {
      await invalidateReview();
      AppToast.success(message ?? "Review deleted");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

//-----------------Admin---------------
export const useModerateReviewMutation = (onDone?: () => void) => {
  const invalidateReview = useInvalidateReview();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TReviewStatus }) =>
      moderateReview(id, status),

    onSuccess: async ({ message }) => {
      await invalidateReview();
      AppToast.success(message ?? "Review status updated");
      onDone?.();
    },
    onError: AppToast.error,
  });
};
