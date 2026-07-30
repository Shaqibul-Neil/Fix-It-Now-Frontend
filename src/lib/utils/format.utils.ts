import { format } from "date-fns";

// Prisma Decimal arrives as a string over JSON.
export const formatMoney = (amount: string | number) =>
  `৳${Number(amount).toLocaleString()}`;

export const formatDate = (value: string) =>
  format(new Date(value), "MMM d, yyyy");

export const formatDateTime = (value: string) =>
  format(new Date(value), "MMM d, yyyy • h:mm a");

// "09:00" -> "9:00 AM". Availability slots are stored as a bare wall clock,
// with no date attached to hand to date-fns.
export const formatTime = (value: string) => {
  const [rawHour, rawMinute] = value.split(":");
  const hour = Number(rawHour) || 0;
  const meridiem = hour >= 12 ? "PM" : "AM";

  return `${hour % 12 || 12}:${rawMinute ?? "00"} ${meridiem}`;
};
