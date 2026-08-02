import type { IFilterConfig, TPeriod } from "@/src/types/filter.types";
import type {
  TBookingStatus,
  TPaymentStatus,
  TRecordStatus,
  TReviewStatus,
  TTechnicianApprovalStatus,
} from "@/src/types/types";

export const DEFAULT_PERIOD: TPeriod = "30";

// Radix Select cannot hold an empty value, so "all" is a real option the
// filter turns back into "no status param".
export const ALL_OPTION_VALUE = "ALL";

// The record status tabs send a real backend literal, so "all" is a value the
// API understands and ALL_OPTION_VALUE does not apply. Matches the backend's
// own default when the param is left out.
export const DEFAULT_RECORD_STATUS: TRecordStatus = "active";

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

  approvalStatus: {
    options: [
      { label: "All applications", value: ALL_OPTION_VALUE },
      {
        label: "Pending",
        value: "PENDING" satisfies TTechnicianApprovalStatus,
      },
      {
        label: "Approved",
        value: "APPROVED" satisfies TTechnicianApprovalStatus,
      },
      {
        label: "Rejected",
        value: "REJECTED" satisfies TTechnicianApprovalStatus,
      },
    ],
  },

  recordStatus: {
    options: [
      {
        label: "All",
        value: "all" satisfies TRecordStatus,
        dotClassName: "bg-project-muted-foreground",
      },
      {
        label: "Active",
        value: "active" satisfies TRecordStatus,
        dotClassName: "bg-project-success",
      },
      {
        label: "Inactive",
        value: "inactive" satisfies TRecordStatus,
        dotClassName: "bg-project-yellow",
      },
      {
        label: "Deleted",
        value: "deleted" satisfies TRecordStatus,
        dotClassName: "bg-project-destructive",
      },
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

  minRating: {
    options: [
      { label: "Any rating", value: ALL_OPTION_VALUE },
      { label: "5 stars", value: "5" },
      { label: "4+ stars", value: "4" },
      { label: "3+ stars", value: "3" },
      { label: "2+ stars", value: "2" },
      { label: "1+ stars", value: "1" },
    ],
  },

  // Major Bangladeshi cities — technicians register with a free-text city,
  // this is just the filter's shortlist, not an exhaustive list.
  city: {
    options: [
      { label: "All cities", value: ALL_OPTION_VALUE },
      { label: "Dhaka", value: "Dhaka" },
      { label: "Chattogram", value: "Chattogram" },
      { label: "Sylhet", value: "Sylhet" },
      { label: "Khulna", value: "Khulna" },
      { label: "Rajshahi", value: "Rajshahi" },
      { label: "Barishal", value: "Barishal" },
      { label: "Rangpur", value: "Rangpur" },
      { label: "Mymensingh", value: "Mymensingh" },
      { label: "Comilla", value: "Comilla" },
      { label: "Gazipur", value: "Gazipur" },
      { label: "Narayanganj", value: "Narayanganj" },
      { label: "Cox's Bazar", value: "Cox's Bazar" },
    ],
  },
};

// An application is either taken or turned down — PENDING is where it starts,
// not a decision the admin can send.
export const TECHNICIAN_DECISION_OPTIONS = [
  { label: "Approve", value: "APPROVED" satisfies TTechnicianApprovalStatus },
  { label: "Reject", value: "REJECTED" satisfies TTechnicianApprovalStatus },
];

// The statuses an admin can move a review to, minus whichever it already is.
export const REVIEW_MODERATION_OPTIONS = [
  { label: "Publish it", value: "PUBLISHED" satisfies TReviewStatus },
  { label: "Hide it", value: "HIDDEN" satisfies TReviewStatus },
  { label: "Reject it", value: "REJECTED" satisfies TReviewStatus },
  { label: "Send back to pending", value: "PENDING" satisfies TReviewStatus },
];
