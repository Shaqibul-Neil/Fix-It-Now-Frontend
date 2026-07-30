"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import type { TPaymentStatus } from "@/src/types/types";
import { paymentKeys } from "../api/payment.key";
import {
  getAdminPaymentDetails,
  getAdminPayments,
  getCustomerPaymentDetails,
  getCustomerPayments,
} from "../api/payment.query.client";
import type { IPaymentListQuery } from "../types/payment.types";

// The URL is the filter, so the hooks read it themselves.
const usePaymentFilter = (): IPaymentListQuery => {
  const { page, pageSize, getFilter } = useServerPagination();

  return {
    status: getFilter("status") as TPaymentStatus | undefined,
    period: getFilter("period"),
    search: getFilter("search"),
    page,
    limit: pageSize,
  };
};

//-----------------Admin---------------
export const useAdminPaymentsQuery = () => {
  const filter = usePaymentFilter();

  return useQuery({
    queryKey: paymentKeys.admin.list(filter),
    queryFn: () => getAdminPayments(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};

export const useAdminPaymentDetailsQuery = (id: string) =>
  useQuery({
    queryKey: paymentKeys.admin.details(id),
    queryFn: () => getAdminPaymentDetails(id),
    select: (response) => response.data,
    enabled: Boolean(id),
  });

//-----------------Customer---------------
export const useCustomerPaymentsQuery = () => {
  const filter = usePaymentFilter();

  return useQuery({
    queryKey: paymentKeys.customer.list(filter),
    queryFn: () => getCustomerPayments(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};

export const useCustomerPaymentDetailsQuery = (id: string) =>
  useQuery({
    queryKey: paymentKeys.customer.details(id),
    queryFn: () => getCustomerPaymentDetails(id),
    select: (response) => response.data,
    enabled: Boolean(id),
  });
