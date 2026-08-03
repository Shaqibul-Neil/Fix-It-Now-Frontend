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

// The clock half of a timestamp, for cells that print the date above it.
export const formatClock = (value?: string | null) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? format(date, "h:mm a") : "—";
};

// "180 days" means nothing to a customer standing in their kitchen, so the
// interval becomes a cadence in words. NONE has nothing worth saying.
export const formatMaintenance = (
  type: "NONE" | "OCCASIONAL" | "RECURRING",
  intervalDays?: number | null,
) => {
  if (type === "OCCASIONAL") {
    return "Booked as and when — this one has no set schedule.";
  }

  if (type !== "RECURRING" || !intervalDays) return null;

  const cadence =
    intervalDays <= 45
      ? "about once a month"
      : intervalDays <= 100
        ? "about every three months"
        : intervalDays <= 200
          ? "about twice a year"
          : intervalDays <= 400
            ? "about once a year"
            : "every couple of years";

  return `Routine upkeep — most homes book this ${cadence}.`;
};

// "09:00" -> "9:00 AM". Availability slots are stored as a bare wall clock,
// with no date attached to hand to date-fns.
export const formatTime = (value: string) => {
  const [rawHour, rawMinute] = value.split(":");
  const hour = Number(rawHour) || 0;
  const meridiem = hour >= 12 ? "PM" : "AM";

  return `${hour % 12 || 12}:${rawMinute ?? "00"} ${meridiem}`;
};
