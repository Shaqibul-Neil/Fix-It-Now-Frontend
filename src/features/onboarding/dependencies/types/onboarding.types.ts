export interface ITechnicianProfile {
  id: string;
  phone: string;
  avatar: string | null;
  bio: string;
  experienceYears: number;
  hourlyRate: string;
  serviceRadius: number | null;
  address: string;
  city: string;
  area: string;
}
