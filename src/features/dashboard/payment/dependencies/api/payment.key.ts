import type { IPaymentListQuery } from "../types/payment.types";

// `lists` is the prefix a mutation invalidates, `list` is the exact query.
export const paymentKeys = {
  admin: {
    lists: ["admin-payments"] as const,
    list: (query: IPaymentListQuery) => ["admin-payments", query] as const,
    details: (id: string) => ["admin-payment", id] as const,
  },
  customer: {
    lists: ["customer-payments"] as const,
    list: (query: IPaymentListQuery) => ["customer-payments", query] as const,
    details: (id: string) => ["customer-payment", id] as const,
  },
};
