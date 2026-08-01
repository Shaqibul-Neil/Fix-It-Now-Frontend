"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import type { TTechnicianApprovalStatus } from "@/src/types/types";
import { technicianKeys } from "../api/technician.key";
import {
  getAdminTechnicianDetails,
  getAdminTechnicians,
} from "../api/technician.query.client";
import type { ITechnicianListQuery } from "../types/technician.types";

// The URL is the filter, so the hooks read it themselves.
const useTechnicianFilter = (): ITechnicianListQuery => {
  const { page, pageSize, getFilter } = useServerPagination();

  return {
    search: getFilter("search"),
    city: getFilter("city"),
    minRating: getFilter("minRating"),
    approvalStatus: getFilter("approvalStatus") as
      | TTechnicianApprovalStatus
      | undefined,
    page,
    limit: pageSize,
  };
};

//-----------------Admin---------------
export const useAdminTechniciansQuery = () => {
  const filter = useTechnicianFilter();

  return useQuery({
    queryKey: technicianKeys.admin.list(filter),
    queryFn: () => getAdminTechnicians(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};

export const useAdminTechnicianDetailsQuery = (id: string) =>
  useQuery({
    queryKey: technicianKeys.admin.details(id),
    queryFn: () => getAdminTechnicianDetails(id),
    select: (response) => response.data,
    enabled: Boolean(id),
  });
