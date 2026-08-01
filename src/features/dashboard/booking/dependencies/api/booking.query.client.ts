import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IAdminBookingDetails,
  IBookingListQuery,
  ICustomerBookingDetails,
  ICustomerBookingRow,
  ITechnicianBookingDetails,
  ITechnicianBookingRow,
  TAdminBookingRow,
} from "../types/booking.types";

const buildQuery = ({
  status,
  category,
  search,
  page,
  limit,
}: IBookingListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) params.set("status", status);
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  return `?${params.toString()}`;
};

//-----------------Admin---------------
export const getAdminBookings = (query: IBookingListQuery) =>
  clientFetch<TAdminBookingRow[]>(
    `${apiEndpoints.dashboard.admin.bookings.list}${buildQuery(query)}`,
  );

export const getAdminBookingDetails = (id: string) =>
  clientFetch<IAdminBookingDetails>(
    apiEndpoints.dashboard.admin.bookings.details(id),
  );

//-----------------Technician---------------
export const getTechnicianBookings = (query: IBookingListQuery) =>
  clientFetch<ITechnicianBookingRow[]>(
    `${apiEndpoints.dashboard.technician.bookings.list}${buildQuery(query)}`,
  );

export const getTechnicianBookingDetails = (id: string) =>
  clientFetch<ITechnicianBookingDetails>(
    apiEndpoints.dashboard.technician.bookings.details(id),
  );

//-----------------Customer---------------
export const getCustomerBookings = (query: IBookingListQuery) =>
  clientFetch<ICustomerBookingRow[]>(
    `${apiEndpoints.dashboard.customer.bookings.list}${buildQuery(query)}`,
  );

export const getCustomerBookingDetails = (id: string) =>
  clientFetch<ICustomerBookingDetails>(
    apiEndpoints.dashboard.customer.bookings.details(id),
  );
