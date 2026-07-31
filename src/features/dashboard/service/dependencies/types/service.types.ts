export interface IBaseServiceRow {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string | null;
  price: string;
  estimatedDuration: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
}

export interface ITechnicianInfo {
  technicianName: string;
  technicianEmail: string;
  technicianRating: string;
}

export interface IServiceRow extends IBaseServiceRow, ITechnicianInfo {}

export interface IAdminService extends IServiceRow {
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
