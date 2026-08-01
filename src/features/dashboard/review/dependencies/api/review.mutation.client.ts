import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { TReviewStatus } from "@/src/types/types";
import type {
  ICreateReviewPayload,
  IUpdateReviewPayload,
} from "../types/review.types";

//-----------------Customer---------------
export const createReview = (payload: ICreateReviewPayload) =>
  clientFetch<{ id: string }>(apiEndpoints.dashboard.customer.reviews.create, {
    method: "POST",
    body: payload,
  });

export const updateReview = (id: string, payload: IUpdateReviewPayload) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.customer.reviews.update(id),
    {
      method: "PATCH",
      body: payload,
    },
  );

//-----------------Customer (own) + Admin (any)---------------
export const deleteReview = (id: string) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.customer.reviews.remove(id),
    {
      method: "DELETE",
    },
  );

//-----------------Admin---------------
export const moderateReview = (id: string, status: TReviewStatus) =>
  clientFetch<{ id: string }>(apiEndpoints.dashboard.admin.reviews.status(id), {
    method: "PATCH",
    body: { status },
  });
