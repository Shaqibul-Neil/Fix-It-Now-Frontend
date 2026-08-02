export const CATEGORY_SORT = ["name", "popular", "trending"] as const;

export type TCategorySort = (typeof CATEGORY_SORT)[number];

export interface IPublicCategoryQuery {
  sort?: TCategorySort;
  limit?: number;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}

export interface ICategoryListItem extends ICategory {
  technicianCount: number;
  serviceCount: number;
  startingPrice: string | null;
  averageRating: string;
  totalReviews: number;
  popularServices: string[];
  isTrending: boolean;
}

export interface ICategoryTechnician {
  id: string;
  name: string;
  avatar: string | null;
  professionalTitle: string | null;
  city: string;
  area: string;
  averageRating: string;
  totalReviews: number;
  completedJobs: number;
  hourlyRate: string;
  isFeatured: boolean;
  isAvailable: boolean;
}

export interface ICategoryService {
  id: string;
  title: string;
  technicianId: string;
  technicianName: string;
  price: string;
  estimatedDuration: number;
  totalBookings: number;
}

export interface ICategoryDetails extends ICategoryListItem {
  coverImage: string | null;
  tagline: string | null;
  overview: string[];
  completedJobs: number;
  responseMinutes: number | null;
  priceRange: { min: string; max: string } | null;
  commonIssues: string[];
  topTechnicians: ICategoryTechnician[];
  topServices: ICategoryService[];
}
