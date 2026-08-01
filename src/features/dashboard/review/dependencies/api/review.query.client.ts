import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IAdminReviewRow,
  ICustomerReviewRow,
  IReviewListQuery,
  ITechnicianReviewRow,
} from "../types/review.types";

const buildQuery = ({
  status,
  rating,
  search,
  page,
  limit,
}: IReviewListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) params.set("status", status);
  if (rating) params.set("rating", rating);
  if (search) params.set("search", search);

  return `?${params.toString()}`;
};

//-----------------Admin---------------
export const getAdminReviews = (query: IReviewListQuery) =>
  clientFetch<IAdminReviewRow[]>(
    `${apiEndpoints.dashboard.admin.reviews.list}${buildQuery(query)}`,
  );

//-----------------Technician---------------
export const getTechnicianReviews = (query: IReviewListQuery) =>
  clientFetch<ITechnicianReviewRow[]>(
    `${apiEndpoints.dashboard.technician.reviews.myReviews}${buildQuery(query)}`,
  );

//-----------------Customer---------------
export const getCustomerReviews = (query: IReviewListQuery) =>
  clientFetch<ICustomerReviewRow[]>(
    `${apiEndpoints.dashboard.customer.reviews.myReviews}${buildQuery(query)}`,
  );
