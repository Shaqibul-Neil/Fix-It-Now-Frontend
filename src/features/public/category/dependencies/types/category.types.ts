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
  startingPrice: string;
  averageRating: string;
  totalReviews: number;
  popularServices: string[];
  isTrending: boolean;
}

export interface ICategoryTechnician {
  id: string;
  name: string;
  avatar: string | null;
  professionalTitle: string;
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
  coverImage: string;
  tagline: string;
  overview: string[];
  completedJobs: number;
  responseMinutes: number;
  priceRange: { min: string; max: string };
  commonIssues: string[];
  topTechnicians: ICategoryTechnician[];
  topServices: ICategoryService[];
}
