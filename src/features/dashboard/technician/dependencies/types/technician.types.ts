import type { IPublicAvailabilitySlot } from "@/src/features/dashboard/availability/dependencies/types/availability.types";
import type {
  TBookingStatus,
  TTechnicianApprovalStatus,
} from "@/src/types/types";

// GET /technicians/admin/list — matches backend's technicianAdminListMapper.
export interface IAdminTechnicianRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

// GET /technicians/admin/:id — technicianDetailsMapper plus the booking counts
// only the admin read carries. No email or phone: the details select does not
// pull them, the list row does.
export interface IAdminTechnicianDetails {
  id: string;
  firstName: string;
  lastName: string;
  bio: string | null;
  experienceYears: number;
  hourlyRate: string;
  serviceRadius: number | null;
  city: string;
  area: string;
  averageRating: string;
  totalReviews: number;
  approvalStatus: TTechnicianApprovalStatus;
  rejectionReason: string | null;
  services: {
    id: string;
    title: string;
    price: string;
    category: string;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    customer: { id: string; name: string };
    service: { id: string; title: string };
  }[];
  availability: IPublicAvailabilitySlot[];
  bookingsByStatus: { status: TBookingStatus; count: number }[];
}

export interface ITechnicianListQuery {
  search?: string;
  city?: string;
  minRating?: string;
  approvalStatus?: TTechnicianApprovalStatus;
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
