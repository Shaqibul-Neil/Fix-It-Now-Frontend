import {
  IBookingStatusCount,
  ICategoryCount,
  ITrendPoint,
} from "@/src/types/chart.types";
import { TPeriod } from "@/src/types/filter.types";
import type { IStatData } from "@/src/types/types";

export interface IStatsQuery {
  period?: TPeriod;
  from?: string;
  to?: string;
}

// GET /stats/admin/dashboard
export interface IAdminStats {
  timePeriod: { from: string; to: string };
  stats: IStatData[];
  charts: {
    bookingsByStatus: IBookingStatusCount[];
    bookingByCategory: ICategoryCount[];
    revenueTrend: ITrendPoint[];
  };
}

// GET /stats/technician/dashboard
export interface ITechnicianStats {
  timePeriod: { from: string; to: string };
  stats: IStatData[];
  charts: {
    jobsByStatus: IBookingStatusCount[];
    earningsTrend: ITrendPoint[];
  };
}
