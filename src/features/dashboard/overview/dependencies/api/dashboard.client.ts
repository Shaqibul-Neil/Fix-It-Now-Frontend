import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import { DEFAULT_PERIOD } from "@/src/lib/options/filter.options";
import type {
  IAdminStats,
  IStatsQuery,
  ITechnicianStats,
} from "../types/dashboard.types";

const buildQuery = ({ period, from, to }: IStatsQuery) =>
  from && to ? `?from=${from}&to=${to}` : `?period=${period ?? DEFAULT_PERIOD}`;

//-----------------Admin Dashboard---------------
export const getAdminStats = (query: IStatsQuery) =>
  clientFetch<IAdminStats>(
    `${apiEndpoints.admin.dashboard.stats}${buildQuery(query)}`,
  );

//-----------------Technician Dashboard---------------
export const getTechnicianStats = (query: IStatsQuery) =>
  clientFetch<ITechnicianStats>(
    `${apiEndpoints.technician.dashboard.stats}${buildQuery(query)}`,
  );
