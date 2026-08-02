import type { TUserRole } from "@/src/lib/auth/auth.roles";
import type { IFilterConfig, TPeriod } from "@/src/types/filter.types";
import type {
  TAccountStatus,
  TBookingStatus,
  TPaymentStatus,
  TRecordStatus,
  TReviewStatus,
  TTechnicianApprovalStatus,
} from "@/src/types/types";

export const DEFAULT_PERIOD: TPeriod = "30";

export const ALL_OPTION_VALUE = "ALL";

export const DEFAULT_RECORD_STATUS: TRecordStatus = "active";

// Removed accounts stay out of the way until the "All" tab asks for them.
export const DEFAULT_ACCOUNT_STATUS: TAccountStatus = "ACTIVE";

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
      {
        label: "All",
        value: ALL_OPTION_VALUE,
        dotClassName: "bg-project-muted-foreground",
      },
      {
        label: "Pending",
        value: "PENDING" satisfies TTechnicianApprovalStatus,
        dotClassName: "bg-project-yellow",
      },
      {
        label: "Approved",
        value: "APPROVED" satisfies TTechnicianApprovalStatus,
        dotClassName: "bg-project-primary",
      },
      {
        label: "Rejected",
        value: "REJECTED" satisfies TTechnicianApprovalStatus,
        dotClassName: "bg-project-destructive",
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
        label: "Paused",
        value: "paused" satisfies TRecordStatus,
        dotClassName: "bg-project-yellow",
      },
      {
        label: "Deleted",
        value: "deleted" satisfies TRecordStatus,
        dotClassName: "bg-project-destructive",
      },
    ],
  },

  accountStatus: {
    options: [
      {
        label: "All",
        value: "all" satisfies TAccountStatus,
        dotClassName: "bg-project-muted-foreground",
      },
      {
        label: "Active",
        value: "ACTIVE" satisfies TAccountStatus,
        dotClassName: "bg-project-success",
      },
      {
        label: "Banned",
        value: "BANNED" satisfies TAccountStatus,
        dotClassName: "bg-project-destructive",
      },
    ],
  },

  role: {
    options: [
      { label: "All roles", value: ALL_OPTION_VALUE },
      { label: "Customer", value: "CUSTOMER" satisfies TUserRole },
      { label: "Technician", value: "TECHNICIAN" satisfies TUserRole },
      { label: "Admin", value: "ADMIN" satisfies TUserRole },
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

  featured: {
    options: [
      { label: "All technicians", value: ALL_OPTION_VALUE },
      { label: "Featured only", value: "true" },
      { label: "Not featured", value: "false" },
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
