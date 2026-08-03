import {
  IBookingStatusCount,
  ICategoryCount,
  ITrendPoint,
} from "@/src/types/chart.types";
import { TPeriod } from "@/src/types/filter.types";
import type { IStatData, TBookingStatus } from "@/src/types/types";

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

export type TMaintenanceStatus = "due" | "soon" | "never" | "ok";

export interface IMaintenanceItem {
  categoryId: string;
  name: string;
  slug: string;
  image: string | null;
  lastServicedAt: string | null;
  dueAt: string | null;
  daysLeft: number | null;
  status: TMaintenanceStatus;
}

export interface IServiceMixSlice {
  categoryId: string;
  categoryName: string;
  count: number;
}

export interface ITrustedTechnician {
  id: string;
  name: string;
  avatar: string | null;
  professionalTitle: string | null;
  jobsTogether: number;
  yourRating: number | null;
}

export interface IActiveBookingSummary {
  id: string;
  status: TBookingStatus;
  serviceTitle: string;
  categoryName: string;
  technicianName: string;
  technicianAvatar: string | null;
  scheduledAt: string;
}

// GET /stats/customer/dashboard
export interface ICustomerStats {
  stats: IStatData[];
  maintenance: IMaintenanceItem[];
  serviceMix: IServiceMixSlice[];
  technicians: { total: number; items: ITrustedTechnician[] };
  activeBooking: {
    total: number;
    primary: IActiveBookingSummary | null;
    others: IActiveBookingSummary[];
  };
}
