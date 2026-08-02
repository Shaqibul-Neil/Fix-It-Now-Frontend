import type { IPublicAvailabilitySlot } from "@/src/features/dashboard/availability/dependencies/types/availability.types";
import type {
  TAccountStatus,
  TBookingStatus,
  TTechnicianApprovalStatus,
  TUserStatus,
} from "@/src/types/types";

// The account state behind a profile. Approval is the application decision;
// this is whether the account itself may sign in — the two move apart, and the
// row actions read both.
interface ITechnicianAccount {
  userId: string;
  accountStatus: TUserStatus;
  isDeleted: boolean;
}

// GET /technicians/admin/list — matches backend's technicianAdminListMapper.
export interface IAdminTechnicianRow extends ITechnicianAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  experienceYears: number;
  hourlyRate: string;
  city: string;
  area: string;
  averageRating: string;
  totalReviews: number;
  approvalStatus: TTechnicianApprovalStatus;
  rejectionReason: string | null;
  reviewedAt: string | null;
  appliedAt: string;
  completedJobs: number;
}

// Mirrors the backend's publicReviewMapper — the comment arrives already split
// into paragraphs, and the reviewer carries their avatar.
export interface ITechnicianReview {
  id: string;
  rating: number;
  comment: string[];
  createdAt: string;
  customer: { id: string; name: string; avatar: string | null };
  service: { id: string; title: string };
}

// A service on the admin read, removed listings included.
export interface ITechnicianService {
  id: string;
  title: string;
  price: string;
  category: string;
  isActive: boolean;
  isDeleted: boolean;
}

// GET /technicians/admin/:id — the public profile plus moderation state, the
// account, and the booking counts only the admin read carries.
export interface IAdminTechnicianDetails extends ITechnicianAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  // Stored as one Text column, split on its blank lines by the API — one
  // paragraph per entry, empty when nothing was written.
  bio: string[];
  experienceYears: number;
  hourlyRate: string;
  serviceRadius: number | null;
  city: string;
  area: string;
  averageRating: string;
  totalReviews: number;
  approvalStatus: TTechnicianApprovalStatus;
  rejectionReason: string | null;
  reviewedAt: string | null;
  appliedAt: string;
  services: ITechnicianService[];
  reviews: ITechnicianReview[];
  availability: IPublicAvailabilitySlot[];
  bookingsByStatus: { status: TBookingStatus; count: number }[];
}

export interface ITechnicianListQuery {
  search?: string;
  city?: string;
  minRating?: string;
  approvalStatus?: TTechnicianApprovalStatus;
  // "all" is the tab, not a param — it widens the list to removed accounts.
  accountStatus?: TAccountStatus;
  page: number;
  limit: number;
}

// PENDING is where an application starts, not something an admin can send back.
export type TApprovalDecision = Extract<
  TTechnicianApprovalStatus,
  "APPROVED" | "REJECTED"
>;

export interface IReviewTechnicianPayload {
  status: TApprovalDecision;
  rejectionReason?: string;
}

// What the approval modal needs from whichever row opened it.
export interface ITechnicianApprovalTarget {
  id: string;
  name: string;
  approvalStatus: TTechnicianApprovalStatus;
}
