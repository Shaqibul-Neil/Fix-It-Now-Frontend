import type { TUserRole } from "@/src/lib/auth/auth.roles";
import type { TAccountStatus, TUserStatus } from "@/src/types/types";

// GET /admin/users — the avatar comes off whichever profile the account has,
// and only a customer carries a booking count.
export interface IAdminUserRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
  avatar: string | null;
  totalBookings: number;
  isDeleted: boolean;
  deletedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface IUserListQuery {
  search?: string;
  role?: TUserRole;
  // "all" is the tab, not a param — it widens the list to removed accounts.
  status?: TAccountStatus;
  page: number;
  limit: number;
}

export interface IUpdateUserStatusPayload {
  status: TUserStatus;
}

// What the account modals need from whichever row opened them. `userId` and not
// `id`, because a technician row opens the same modals with its owner's id.
export interface IAccountActionTarget {
  userId: string;
  name: string;
}
