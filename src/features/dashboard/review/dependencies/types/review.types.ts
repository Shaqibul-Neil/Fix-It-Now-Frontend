import type { TReviewStatus } from "@/src/types/types";

interface IReviewParty {
  id: string;
  name: string;
  avatar: string | null;
}

interface IReviewedService {
  id: string;
  title: string;
}

// GET /reviews/my-reviews — the customer's own reviews. `status` is here
// because this is the only place they learn a review is not published yet.
export interface ICustomerReviewRow {
  id: string;
  rating: number;
  comment: string | null;
  status: TReviewStatus;
  createdAt: string;
  bookingId: string;
  technician: IReviewParty;
  service: IReviewedService;
}

// GET /admin/reviews — the customer row plus both parties with their email.
export interface IAdminReviewRow extends Omit<
  ICustomerReviewRow,
  "technician"
> {
  updatedAt: string;
  technician: IReviewParty & { email: string };
  customer: IReviewParty & { email: string };
}

// GET /technician/reviews — PUBLISHED only, so no status rides along. This one
// is served by the public mapper, which splits the comment into paragraphs.
export interface ITechnicianReviewRow {
  id: string;
  rating: number;
  comment: string[];
  createdAt: string;
  customer: IReviewParty;
  service: IReviewedService;
}

export interface IReviewListQuery {
  status?: TReviewStatus;
  rating?: string;
  search?: string;
  page: number;
  limit: number;
}

export interface ICreateReviewPayload {
  bookingId: string;
  rating: number;
  comment?: string;
}

export interface IUpdateReviewPayload {
  rating?: number;
  comment?: string;
}

// What the review panel needs from whichever row opened it. `reviewId` set
// means the panel edits instead of creating.
export interface IReviewTarget {
  bookingId: string;
  serviceTitle: string;
  technicianName: string;
  reviewId?: string | null;
  rating?: number;
  comment?: string | null;
}
