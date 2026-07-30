"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import type { TBookingStatus } from "@/src/types/types";
import { bookingKeys } from "../api/booking.key";
import {
  getAdminBookingDetails,
  getAdminBookings,
  getCustomerBookingDetails,
  getCustomerBookings,
  getTechnicianBookingDetails,
  getTechnicianBookings,
} from "../api/booking.query.client";
import type { IBookingListQuery } from "../types/booking.types";

// The URL is the filter, so the hooks read it themselves.
const useBookingFilter = (): IBookingListQuery => {
  const { page, pageSize, getFilter } = useServerPagination();

  return {
    status: getFilter("status") as TBookingStatus | undefined,
    category: getFilter("category"),
    search: getFilter("search"),
    page,
    limit: pageSize,
  };
};

//-----------------Admin---------------
export const useAdminBookingsQuery = () => {
  const filter = useBookingFilter();

  return useQuery({
    queryKey: bookingKeys.admin.list(filter),
    queryFn: () => getAdminBookings(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};

export const useAdminBookingDetailsQuery = (id: string) =>
  useQuery({
    queryKey: bookingKeys.admin.details(id),
    queryFn: () => getAdminBookingDetails(id),
    select: (response) => response.data,
    enabled: Boolean(id),
  });

//-----------------Technician---------------
export const useTechnicianBookingsQuery = () => {
  const filter = useBookingFilter();

  return useQuery({
    queryKey: bookingKeys.technician.list(filter),
    queryFn: () => getTechnicianBookings(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};

export const useTechnicianBookingDetailsQuery = (id: string) =>
  useQuery({
    queryKey: bookingKeys.technician.details(id),
    queryFn: () => getTechnicianBookingDetails(id),
    select: (response) => response.data,
    enabled: Boolean(id),
  });

//-----------------Customer---------------
export const useCustomerBookingsQuery = () => {
  const filter = useBookingFilter();

  return useQuery({
    queryKey: bookingKeys.customer.list(filter),
    queryFn: () => getCustomerBookings(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};

export const useCustomerBookingDetailsQuery = (id: string) =>
  useQuery({
    queryKey: bookingKeys.customer.details(id),
    queryFn: () => getCustomerBookingDetails(id),
    select: (response) => response.data,
    enabled: Boolean(id),
  });
