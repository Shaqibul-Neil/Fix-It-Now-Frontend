import type { TRecordStatus } from "@/src/types/types";

export const MAINTENANCE_TYPES = ["NONE", "OCCASIONAL", "RECURRING"] as const;

export type TMaintenanceType = (typeof MAINTENANCE_TYPES)[number];

// Admin table row — the backend's ADMIN_CATEGORY_SELECT plus the two fields
// its mapper derives.
export interface IAdminCategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  coverImage: string | null;
  tagline: string | null;
  overview: string[];
  commonIssues: string[];
  maintenanceType: TMaintenanceType;
  maintenanceIntervalDays: number | null;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  totalServices: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryListQuery {
  search?: string;
  status?: TRecordStatus;
  page: number;
  limit: number;
}

export interface ICreateCategoryPayload {
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  maintenanceType: TMaintenanceType;
  maintenanceIntervalDays?: number;
}

// Only an update can clear a field — a create has nothing to clear yet.
export type IUpdateCategoryPayload = Partial<
  Omit<ICreateCategoryPayload, "image" | "maintenanceIntervalDays">
> & {
  image?: string | null;
  maintenanceIntervalDays?: number | null;
};

// What the category panel needs from whichever row opened it. `id` set means
// the panel edits instead of creating.
export interface ICategoryFormTarget {
  id?: string;
  name?: string;
  description?: string | null;
  image?: string | null;
  isActive?: boolean;
  maintenanceType?: TMaintenanceType;
  maintenanceIntervalDays?: number | null;
}
