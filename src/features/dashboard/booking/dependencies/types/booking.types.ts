import type { TBookingStatus, TReviewStatus } from "@/src/types/types";

// Decimal and DateTime both arrive as strings over JSON.
export interface IBookingRowBase {
  id: string;
  status: TBookingStatus;
  amount: string;
  category: string;
  scheduledAt: string;
  createdAt: string;
  completedAt: string | null;
  serviceId: string;
  serviceTitle: string;
}

export interface ICustomerBookingRow extends IBookingRowBase {
  technicianName: string;
  technicianEmail: string;
  technicianPhone: string;
  // null until the customer reviews this booking. Only the customer's row
  // carries it — nobody else can write the review.
  reviewId: string | null;
  reviewStatus: TReviewStatus | null;
}

export interface ITechnicianBookingRow extends IBookingRowBase {
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
}

// Both parties, but no review marker — the admin list mapper does not send one.
export type TAdminBookingRow = Omit<
  ICustomerBookingRow,
  "reviewId" | "reviewStatus"
> &
  ITechnicianBookingRow;

export interface IBookingListQuery {
  status?: TBookingStatus;
  category?: string;
  search?: string;
  page: number;
  limit: number;
}

export interface IBookingStatusHistoryEntry {
  status: TBookingStatus;
  note: string | null;
  createdAt: string;
}

interface IPartyUser {
  firstName: string;
  lastName: string;
  email: string;
}

interface IBookingDetailsBase {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  status: TBookingStatus;
  address: string;
  city: string | null;
  area: string | null;
  notes: string | null;
  amount: string;
  categoryName: string;
  scheduledAt: string;
  acceptedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  statusHistory: IBookingStatusHistoryEntry[];
}

interface IServiceSummary {
  id: string;
  title: string;
  price: string;
  category: { id: string; name: string };
}

export interface ICustomerBookingDetails extends IBookingDetailsBase {
  service: IServiceSummary;
  technician: {
    id: string;
    averageRating: string;
    users: Pick<IPartyUser, "firstName" | "lastName">;
  };
  // Nested here, flattened on the list row — the details endpoint returns the
  // query result as-is, with no mapper in between.
  review: { id: string; status: TReviewStatus } | null;
}

export interface ITechnicianBookingDetails extends IBookingDetailsBase {
  service: IServiceSummary;
  customer: {
    id: string;
    phone: string | null;
    users: IPartyUser;
  };
}

// Both parties are trimmed to name, contact and the User id an admin jumps to.
// The wide profile selects were dropped server-side to keep passwordHash off
// the wire, so nothing here may reach past what the include now lists.
interface IAdminBookingParty {
  id: string;
  phone: string | null;
  users: IPartyUser & { id: string };
}

export interface IAdminBookingDetails extends Omit<
  IBookingDetailsBase,
  "statusHistory"
> {
  service: {
    id: string;
    title: string;
    price: string;
    isActive: boolean;
    category: { id: string; name: string };
  };
  customer: IAdminBookingParty;
  technician: IAdminBookingParty;
  // Only the admin sees who moved the booking — on a dispute that is the
  // whole question.
  statusHistory: (IBookingStatusHistoryEntry & { changedById: string })[];
}

export type TBookingStatusUpdate = Extract<
  TBookingStatus,
  "ACCEPTED" | "DECLINED" | "IN_PROGRESS" | "COMPLETED"
>;

export interface IUpdateBookingStatusPayload {
  status: TBookingStatusUpdate;
  note?: string;
}
