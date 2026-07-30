import type { IReviewListQuery } from "../types/review.types";

// `lists` is the prefix a mutation invalidates, `list` is the exact query.
export const reviewKeys = {
  admin: {
    lists: ["admin-reviews"] as const,
    list: (query: IReviewListQuery) => ["admin-reviews", query] as const,
  },
  technician: {
    lists: ["technician-reviews"] as const,
    list: (query: IReviewListQuery) => ["technician-reviews", query] as const,
  },
  customer: {
    lists: ["customer-reviews"] as const,
    list: (query: IReviewListQuery) => ["customer-reviews", query] as const,
  },
};
