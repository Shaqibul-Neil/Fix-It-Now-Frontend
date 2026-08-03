"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import type { TPeriod } from "@/src/types/filter.types";
import {
  getAdminStats,
  getCustomerStats,
  getTechnicianStats,
} from "../api/dashboard.client";
import type { IStatsQuery } from "../types/dashboard.types";
import { dashboardKeys } from "../api/dashboard.key";

// The URL is the filter, so the hooks read it themselves and a page just calls
// the hook — nothing to thread through as a prop.
const useStatsFilter = (): IStatsQuery => {
  const searchParams = useSearchParams();

  return {
    period: (searchParams.get("period") ?? undefined) as TPeriod | undefined,
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
  };
};

//-----------------Admin Dashboard---------------
export const useAdminStatsQuery = () => {
  const filter = useStatsFilter();

  return useQuery({
    queryKey: dashboardKeys.admin.stats(filter),
    queryFn: () => getAdminStats(filter),
    select: (response) => response.data,
    placeholderData: keepPreviousData,
  });
};

//-----------------Technician Dashboard---------------
export const useTechnicianStatsQuery = () => {
  const filter = useStatsFilter();

  return useQuery({
    queryKey: dashboardKeys.technician.stats(filter),
    queryFn: () => getTechnicianStats(filter),
    select: (response) => response.data,
    placeholderData: keepPreviousData,
  });
};

//-----------------Customer Dashboard---------------
export const useCustomerStatsQuery = () =>
  useQuery({
    queryKey: dashboardKeys.customer.stats(),
    queryFn: getCustomerStats,
    select: (response) => response.data,
  });
