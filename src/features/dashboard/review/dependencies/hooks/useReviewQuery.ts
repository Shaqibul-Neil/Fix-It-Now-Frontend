"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import type { TReviewStatus } from "@/src/types/types";
import { reviewKeys } from "../api/review.key";
import {
  getAdminReviews,
  getCustomerReviews,
  getTechnicianReviews,
} from "../api/review.query.client";
import type { IReviewListQuery } from "../types/review.types";

// The URL is the filter, so the hooks read it themselves.
const useReviewFilter = (): IReviewListQuery => {
  const { page, pageSize, getFilter } = useServerPagination();

  return {
    status: getFilter("status") as TReviewStatus | undefined,
    rating: getFilter("rating"),
    search: getFilter("search"),
    page,
    limit: pageSize,
  };
};

//-----------------Admin---------------
export const useAdminReviewsQuery = () => {
  const filter = useReviewFilter();

  return useQuery({
    queryKey: reviewKeys.admin.list(filter),
    queryFn: () => getAdminReviews(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};

//-----------------Technician---------------
export const useTechnicianReviewsQuery = () => {
  const filter = useReviewFilter();

  return useQuery({
    queryKey: reviewKeys.technician.list(filter),
    queryFn: () => getTechnicianReviews(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};

//-----------------Customer---------------
export const useCustomerReviewsQuery = () => {
  const filter = useReviewFilter();

  return useQuery({
    queryKey: reviewKeys.customer.list(filter),
    queryFn: () => getCustomerReviews(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};
