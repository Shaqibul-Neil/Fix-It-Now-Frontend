import type { IFilterConfig, TPeriod } from "@/src/types/filter.types";
import type {
  TBookingStatus,
  TPaymentStatus,
  TReviewStatus,
} from "@/src/types/types";

export const DEFAULT_PERIOD: TPeriod = "30";

// Radix Select cannot hold an empty value, so "all" is a real option the
// filter turns back into "no status param".
export const ALL_OPTION_VALUE = "ALL";

export const FILTER_OPTIONS: IFilterConfig = {
  period: {
    options: [
      { label: "Last 7 days", value: "7" satisfies TPeriod },
      { label: "Last 30 days", value: "30" satisfies TPeriod },
      { label: "Last 90 days", value: "90" satisfies TPeriod },
    ],
  },

  bookingStatus: {
    options: [
      { label: "All statuses", value: ALL_OPTION_VALUE },
      { label: "Requested", value: "REQUESTED" satisfies TBookingStatus },
      { label: "Accepted", value: "ACCEPTED" satisfies TBookingStatus },
      { label: "Paid", value: "PAID" satisfies TBookingStatus },
      { label: "In progress", value: "IN_PROGRESS" satisfies TBookingStatus },
      { label: "Completed", value: "COMPLETED" satisfies TBookingStatus },
      { label: "Declined", value: "DECLINED" satisfies TBookingStatus },
      { label: "Cancelled", value: "CANCELLED" satisfies TBookingStatus },
    ],
  },

  paymentStatus: {
    options: [
      { label: "All statuses", value: ALL_OPTION_VALUE },
      { label: "Pending", value: "PENDING" satisfies TPaymentStatus },
      { label: "Paid", value: "SUCCESS" satisfies TPaymentStatus },
      { label: "Failed", value: "FAILED" satisfies TPaymentStatus },
      { label: "Refunded", value: "REFUNDED" satisfies TPaymentStatus },
    ],
  },

  reviewStatus: {
    options: [
      { label: "All statuses", value: ALL_OPTION_VALUE },
      { label: "Pending", value: "PENDING" satisfies TReviewStatus },
      { label: "Published", value: "PUBLISHED" satisfies TReviewStatus },
      { label: "Hidden", value: "HIDDEN" satisfies TReviewStatus },
      { label: "Rejected", value: "REJECTED" satisfies TReviewStatus },
    ],
  },

  rating: {
    options: [
      { label: "All ratings", value: ALL_OPTION_VALUE },
      { label: "5 stars", value: "5" },
      { label: "4 stars", value: "4" },
      { label: "3 stars", value: "3" },
      { label: "2 stars", value: "2" },
      { label: "1 star", value: "1" },
    ],
  },
};

// The statuses an admin can move a review to, minus whichever it already is.
export const REVIEW_MODERATION_OPTIONS = [
  { label: "Publish it", value: "PUBLISHED" satisfies TReviewStatus },
  { label: "Hide it", value: "HIDDEN" satisfies TReviewStatus },
  { label: "Reject it", value: "REJECTED" satisfies TReviewStatus },
  { label: "Send back to pending", value: "PENDING" satisfies TReviewStatus },
];
