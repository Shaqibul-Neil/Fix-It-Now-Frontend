import { format } from "date-fns";

// Prisma Decimal arrives as a string over JSON.
export const formatMoney = (amount: string | number) =>
  `৳${Number(amount).toLocaleString()}`;

// date-fns throws on an Invalid Date, and not every endpoint sends every
// timestamp — a missing one prints a dash instead of taking the page down.
export const formatDate = (value?: string | null) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime())
    ? format(date, "MMM d, yyyy")
    : "—";
};

export const formatDateTime = (value?: string | null) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime())
    ? format(date, "MMM d, yyyy • h:mm a")
    : "—";
};

// "09:00" -> "9:00 AM". Availability slots are stored as a bare wall clock,
// with no date attached to hand to date-fns.
export const formatTime = (value: string) => {
  const [rawHour, rawMinute] = value.split(":");
  const hour = Number(rawHour) || 0;
  const meridiem = hour >= 12 ? "PM" : "AM";

  return `${hour % 12 || 12}:${rawMinute ?? "00"} ${meridiem}`;
};
