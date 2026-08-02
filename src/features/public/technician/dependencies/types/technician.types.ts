import type { IPublicAvailabilitySlot } from "@/src/features/dashboard/availability/dependencies/types/availability.types";

export const TECHNICIAN_SORT = [
  "best_match",
  "top_rated",
  "most_reviewed",
  "price_low",
  "price_high",
  "newest",
] as const;

export const PRICE_BUCKET = [
  "under_500",
  "500_1000",
  "1000_2000",
  "2000_plus",
] as const;

export type TTechnicianSort = (typeof TECHNICIAN_SORT)[number];
export type TPriceBucket = (typeof PRICE_BUCKET)[number];

export interface ITechnicianServiceRow {
  id: string;
  title: string;
  price: string;
  category: string;
}

export interface ITechnicianService extends ITechnicianServiceRow {
  estimatedDuration: number | null;
  categoryImage: string | null;
}

export interface IPublicReview {
  id: string;
  rating: number;
  comment: string[];
  createdAt: string;
  customer: { id: string; name: string; avatar: string | null };
  service: { id: string; title: string };
}

export interface ITechnician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  professionalTitle: string | null;
  bio: string;
  skills: string[];
  experienceYears: number;
  hourlyRate: string;
  city: string;
  area: string;
  averageRating: string;
  totalReviews: number;
  isFeatured: boolean;
  isAvailable: boolean;
  offersEmergencyService: boolean;
  services: ITechnicianServiceRow[];
}

export interface ITechnicianDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  coverImage: string | null;
  professionalTitle: string | null;
  tagline: string | null;
  isVerified: boolean;
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
  offersEmergencyService: boolean;
  services: ITechnicianService[];
  reviews: IPublicReview[];
  availability: IPublicAvailabilitySlot[];
}

export interface ITechnicianFacets {
  categories: { id: string; name: string; slug: string; count: number }[];
  skills: { value: string; count: number }[];
  priceBuckets: TPriceBucket[];
  sortOptions: TTechnicianSort[];
}

export interface IPublicTechnicianQuery {
  search?: string;
  city?: string[];
  categoryIds?: string[];
  skills?: string[];
  priceBuckets?: TPriceBucket[];
  minRating?: string;
  sort?: TTechnicianSort;
  acceptingClients?: boolean;
  eveningAvailable?: boolean;
  weekendAvailable?: boolean;
  emergencyService?: boolean;
  featured?: boolean;
  page: number;
  limit: number;
}
