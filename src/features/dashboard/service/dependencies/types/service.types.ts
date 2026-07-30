// GET /services — every Service scalar plus the flattened category and
// technician the public list mapper adds.
export interface IServiceRow {
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
  technicianName: string;
  technicianEmail: string;
  technicianRating: string;
}

export interface IServiceListQuery {
  category?: string;
  search?: string;
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
