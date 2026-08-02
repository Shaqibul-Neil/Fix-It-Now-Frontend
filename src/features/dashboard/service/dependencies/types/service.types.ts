import type { TRecordStatus } from "@/src/types/types";

export interface IBaseServiceRow {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  price: string;
  estimatedDuration: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
  // A service carries no image of its own, so the row borrows its category's.
  categoryImage: string | null;
}

// Every list but the admin one carries it — see IAdminServiceRow.
export interface IServiceAbout {
  description: string | null;
}

export interface ITechnicianInfo {
  technicianName: string;
  technicianEmail: string;
  technicianRating: string;
  technicianAvatar: string | null;
}

// `role` decides whether the owner may undo it — an admin takedown they cannot.
export interface IRemovedBy {
  name: string;
  role: string;
}

// The soft-delete columns the public list mapper strips.
export interface IServiceRecordState {
  isActive: boolean;
  deletedAt: string | null;
  isDeleted: boolean;
  removedBy: IRemovedBy | null;
}

export interface IManagedServiceRow
  extends IBaseServiceRow, IServiceAbout, IServiceRecordState {}

// What a customer browsing the catalogue sees — every live service with the
// technician behind it. Removed and paused rows never reach this list.
export interface ICustomerServiceRow
  extends IBaseServiceRow, IServiceAbout, ITechnicianInfo {}

// `description` is gone on purpose: the admin list mapper drops it, because at
// up to 2000 characters it would ship a paragraph per row that nothing renders.
export interface IAdminServiceRow
  extends Omit<IManagedServiceRow, "description">, ITechnicianInfo {
  totalBookings: number;
}

export interface IServiceListQuery {
  category?: string;
  search?: string;
  city?: string;
  minRating?: string;
  page: number;
  limit: number;
}

// The owner's list and the admin's list take the same filters plus the tab.
export interface IManagedServiceListQuery extends IServiceListQuery {
  status?: TRecordStatus;
}

// What the booking form needs from the row that opened it. `technicianId`
// fetches the working hours; `estimatedDuration` is the step the bookable
// start times are generated on.
export interface IBookableService {
  id: string;
  title: string;
  price: string;
  technicianId: string;
  technicianName: string;
  estimatedDuration: number | null;
}

export interface ICreateServicePayload {
  categoryId: string;
  title: string;
  description?: string;
  price: number;
  estimatedDuration: number;
  isActive: boolean;
}

export type IUpdateServicePayload = Partial<ICreateServicePayload>;

// What the service panel needs from whichever row opened it. `id` set means
// the panel edits instead of creating.
export interface IServiceFormTarget {
  id?: string;
  categoryId?: string;
  title?: string;
  description?: string | null;
  price?: string;
  estimatedDuration?: number | null;
  isActive?: boolean;
}
