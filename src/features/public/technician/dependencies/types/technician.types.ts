// Public technician list row — matches backend's technicianListMapper.
export interface ITechnician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  experienceYears: number;
  hourlyRate: string;
  city: string;
  area: string;
  averageRating: string;
  totalReviews: number;
}

// GET /technicians/:id — same row plus the profile fields only a single-item
// read carries.
export interface ITechnicianDetails extends ITechnician {
  bio: string | null;
  address: string;
  serviceRadius: number | null;
}

export interface IPublicTechnicianQuery {
  search?: string;
  city?: string;
  minRating?: string;
  page: number;
  limit: number;
}
