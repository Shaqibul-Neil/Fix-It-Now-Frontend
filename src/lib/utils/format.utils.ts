import { format } from "date-fns";

// Prisma Decimal arrives as a string over JSON.
export const formatMoney = (amount: string | number) =>
  `৳${Number(amount).toLocaleString()}`;

export const formatDate = (value: string) =>
  format(new Date(value), "MMM d, yyyy");

export const formatDateTime = (value: string) =>
  format(new Date(value), "MMM d, yyyy • h:mm a");
