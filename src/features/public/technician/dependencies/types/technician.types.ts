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
