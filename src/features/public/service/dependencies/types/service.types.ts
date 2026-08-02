export interface IPublicServiceRow {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string | null;
  price: string;
  estimatedDuration: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
  // A service carries no image of its own, so the card borrows its category's.
  categoryImage: string | null;
  technicianName: string;
  technicianEmail: string;
  technicianRating: string;
  technicianAvatar: string | null;
}

export interface IPublicServiceListQuery {
  search?: string;
  category?: string;
  city?: string;
  area?: string;
  minRating?: string;
  page: number;
  limit: number;
}
