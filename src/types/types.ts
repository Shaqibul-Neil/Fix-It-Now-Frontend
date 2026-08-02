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

// The account tabs. "all" is not a backend status — it drops the status filter
// and sends `includeDeleted`, which is the only way removed rows come back.
export type TAccountStatus = TUserStatus | "all";

export const TECHNICIAN_APPROVAL_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type TTechnicianApprovalStatus =
  (typeof TECHNICIAN_APPROVAL_STATUS)[keyof typeof TECHNICIAN_APPROVAL_STATUS];

export type TBookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type TPaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export type TReviewStatus = "PENDING" | "PUBLISHED" | "HIDDEN" | "REJECTED";

// Soft-delete aware row filter the backend shares between Category and Service.
export type TRecordStatus = "active" | "paused" | "deleted" | "all";

export interface IStatData {
  id: string;
  label: string;
  value: number;
  changeValue?: number;
  changePercentage?: number;
}
