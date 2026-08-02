"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import { DEFAULT_RECORD_STATUS } from "@/src/lib/options/filter.options";
import type { TRecordStatus } from "@/src/types/types";
import { serviceKeys } from "../api/service.key";
import {
  getAdminServices,
  getServices,
  getTechnicianOwnServices,
} from "../api/service.query.client";
import type {
  IManagedServiceListQuery,
  IServiceListQuery,
} from "../types/service.types";

// The URL is the filter, so the hook reads it itself.
const useServiceFilter = (): IServiceListQuery => {
  const { page, pageSize, getFilter } = useServerPagination();

  return {
    category: getFilter("category"),
    search: getFilter("search"),
    city: getFilter("city"),
    minRating: getFilter("minRating"),
    page,
    limit: pageSize,
  };
};

// Same filters plus the record-status tab, which only these two roles get.
const useManagedServiceFilter = (): IManagedServiceListQuery => {
  const filter = useServiceFilter();
  const { getFilter } = useServerPagination();

  return {
    ...filter,
    status: (getFilter("status") as TRecordStatus) ?? DEFAULT_RECORD_STATUS,
  };
};

//-----------------Admin---------------
export const useAdminServicesQuery = () => {
  const filter = useManagedServiceFilter();

  return useQuery({
    queryKey: serviceKeys.admin.list(filter),
    queryFn: () => getAdminServices(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};

//-----------------Technician---------------
export const useTechnicianServicesQuery = () => {
  const filter = useManagedServiceFilter();

  return useQuery({
    queryKey: serviceKeys.technician.list(filter),
    queryFn: () => getTechnicianOwnServices(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};

//-----------------Customer---------------
export const useServicesQuery = () => {
  const filter = useServiceFilter();

  return useQuery({
    queryKey: serviceKeys.customer.list(filter),
    queryFn: () => getServices(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};
