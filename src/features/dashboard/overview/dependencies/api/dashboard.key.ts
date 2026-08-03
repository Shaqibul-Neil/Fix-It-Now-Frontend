import type { IStatsQuery } from "../types/dashboard.types";

export const dashboardKeys = {
  admin: {
    stats: (filter: IStatsQuery) => ["admin-stats", filter] as const,
  },
  technician: {
    stats: (filter: IStatsQuery) => ["technician-stats", filter] as const,
  },
  customer: {
    stats: () => ["customer-stats"] as const,
  },
};
