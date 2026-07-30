import type { TUserRole } from "@/src/lib/auth/auth.roles";

export interface IApiMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IApiResponse<TData> {
  success: boolean;
  message?: string;
  data?: TData;
  meta?: IApiMeta;
}

export interface ITokens {
  accessToken: string;
  refreshToken?: string;
}

export interface IProfileUser {
  name: string;
  email: string;
  role: TUserRole;
  avatarUrl?: string | null;
}

export type TUserStatus = "ACTIVE" | "BANNED";

export const TECHNICIAN_APPROVAL_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type TTechnicianApprovalStatus =
  (typeof TECHNICIAN_APPROVAL_STATUS)[keyof typeof TECHNICIAN_APPROVAL_STATUS];

// backend: stats.interface.ts -> IStatData
// buildMetrics sends changePercentage for rates and changeValue for counts,
// so exactly one of the two is present on any card.
export interface IStatData {
  id: string;
  label: string;
  value: number;
  changeValue?: number;
  changePercentage?: number;
}
