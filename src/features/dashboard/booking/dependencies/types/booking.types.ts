import type { TBookingStatus } from "@/src/types/types";

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
}

export interface ITechnicianBookingRow extends IBookingRowBase {
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
}

export type TAdminBookingRow = ICustomerBookingRow & ITechnicianBookingRow;

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
}

export interface ITechnicianBookingDetails extends IBookingDetailsBase {
  service: IServiceSummary;
  customer: {
    id: string;
    phone: string | null;
    users: IPartyUser;
  };
}

export interface IAdminBookingDetails extends IBookingDetailsBase {
  service: {
    id: string;
    title: string;
    description: string | null;
    price: string;
    estimatedDuration: number | null;
    isActive: boolean;
  };
  customer: {
    id: string;
    phone: string | null;
    city: string | null;
    area: string | null;
    defaultAddress: string | null;
    users: IPartyUser;
  };
  technician: {
    id: string;
    phone: string;
    city: string;
    area: string;
    experienceYears: number;
    hourlyRate: string;
    averageRating: string;
    totalReviews: number;
    users: IPartyUser;
  };
}

export type TBookingStatusUpdate = Extract<
  TBookingStatus,
  "ACCEPTED" | "DECLINED" | "IN_PROGRESS" | "COMPLETED"
>;

export interface IUpdateBookingStatusPayload {
  status: TBookingStatusUpdate;
  note?: string;
}
