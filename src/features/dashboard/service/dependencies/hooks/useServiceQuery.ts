"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import { serviceKeys } from "../api/service.key";
import {
  getAdminServices,
  getServices,
  getTechnicianOwnServices,
} from "../api/service.query.client";
import type { IServiceListQuery } from "../types/service.types";

const useServiceFilter = (): IServiceListQuery => {
  const { page, pageSize, getFilter } = useServerPagination();

  return {
    category: getFilter("category"),
    search: getFilter("search"),
    page,
    limit: pageSize,
  };
};

//-----------------Admin---------------
export const useAdminServicesQuery = () => {
  const filter = useServiceFilter();

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
  const filter = useServiceFilter();

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
