import type { IBookingListQuery } from "../types/booking.types";

// `lists` is the prefix a mutation invalidates, `list` is the exact query.
export const bookingKeys = {
  admin: {
    lists: ["admin-bookings"] as const,
    list: (query: IBookingListQuery) => ["admin-bookings", query] as const,
    details: (id: string) => ["admin-booking", id] as const,
  },
  technician: {
    lists: ["technician-bookings"] as const,
    list: (query: IBookingListQuery) => ["technician-bookings", query] as const,
    details: (id: string) => ["technician-booking", id] as const,
  },
  customer: {
    lists: ["customer-bookings"] as const,
    list: (query: IBookingListQuery) => ["customer-bookings", query] as const,
    details: (id: string) => ["customer-booking", id] as const,
  },
};
