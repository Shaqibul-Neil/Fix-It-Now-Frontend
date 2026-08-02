import type { IPublicAvailabilitySlot } from "@/src/features/dashboard/availability/dependencies/types/availability.types";
import type {
  IPublicReview,
  ITechnicianService,
} from "@/src/features/public/technician/dependencies/types/technician.types";
import type {
  TAccountStatus,
  TBookingStatus,
  TTechnicianApprovalStatus,
  TUserStatus,
} from "@/src/types/types";

interface ITechnicianAccount {
  userId: string;
  accountStatus: TUserStatus;
  isDeleted: boolean;
}

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
  isFeatured: boolean;
  approvalStatus: TTechnicianApprovalStatus;
  rejectionReason: string | null;
  reviewedAt: string | null;
  appliedAt: string;
  completedJobs: number;
}

export interface ITechnicianIdentity {
  nationalId: string;
  nidDocument: string | null;
  passportNumber: string | null;
  dateOfBirth: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
}

export interface IAdminTechnicianService extends ITechnicianService {
  isActive: boolean;
  isDeleted: boolean;
}

export interface IAdminTechnicianDetails extends ITechnicianAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  avatar: string | null;
  coverImage: string | null;
  professionalTitle: string | null;
  tagline: string | null;
  bio: string[];
  skills: string[];
  workHighlights: string[];
  experienceYears: number;
  hourlyRate: string;
  serviceRadius: number | null;
  city: string;
  area: string;
  averageRating: string;
  totalReviews: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isProfileComplete: boolean;
  offersEmergencyService: boolean;
  identity: ITechnicianIdentity;
  approvalStatus: TTechnicianApprovalStatus;
  rejectionReason: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  appliedAt: string;
  updatedAt: string;
  services: IAdminTechnicianService[];
  reviews: IPublicReview[];
  availability: IPublicAvailabilitySlot[];
  bookingsByStatus: { status: TBookingStatus; count: number }[];
}

export interface ITechnicianListQuery {
  search?: string;
  city?: string;
  minRating?: string;
  approvalStatus?: TTechnicianApprovalStatus;
  accountStatus?: TAccountStatus;
  featured?: boolean;
  page: number;
  limit: number;
}

export type TApprovalDecision = Extract<
  TTechnicianApprovalStatus,
  "APPROVED" | "REJECTED"
>;

export interface IReviewTechnicianPayload {
  status: TApprovalDecision;
  rejectionReason?: string;
}

export interface IUpdateFeaturedPayload {
  isFeatured: boolean;
}

export interface ITechnicianApprovalTarget {
  id: string;
  name: string;
  approvalStatus: TTechnicianApprovalStatus;
}
