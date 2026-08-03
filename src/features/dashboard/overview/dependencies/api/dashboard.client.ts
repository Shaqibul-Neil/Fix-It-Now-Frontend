import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import { DEFAULT_PERIOD } from "@/src/lib/options/filter.options";
import type {
  IAdminStats,
  ICustomerStats,
  IStatsQuery,
  ITechnicianStats,
} from "../types/dashboard.types";

const buildQuery = ({ period, from, to }: IStatsQuery) =>
  from && to ? `?from=${from}&to=${to}` : `?period=${period ?? DEFAULT_PERIOD}`;

//-----------------Admin Dashboard---------------
export const getAdminStats = (query: IStatsQuery) =>
  clientFetch<IAdminStats>(
    `${apiEndpoints.dashboard.admin.stats.dashboard}${buildQuery(query)}`,
  );

//-----------------Technician Dashboard---------------
export const getTechnicianStats = (query: IStatsQuery) =>
  clientFetch<ITechnicianStats>(
    `${apiEndpoints.dashboard.technician.stats.dashboard}${buildQuery(query)}`,
  );

//-----------------Customer Dashboard---------------
// The route takes no period — a customer's board is about what is open now,
// not a window they pick.
export const getCustomerStats = () =>
  clientFetch<ICustomerStats>(apiEndpoints.dashboard.customer.stats.dashboard);
