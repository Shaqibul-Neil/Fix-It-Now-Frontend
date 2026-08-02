export interface ITechnicianProfile {
  id: string;
  phone: string;
  avatar: string | null;
  coverImage: string | null;
  professionalTitle: string | null;
  tagline: string | null;
  bio: string;
  skills: string[];
  workHighlights: string[];
  experienceYears: number;
  hourlyRate: string;
  serviceRadius: number | null;
  offersEmergencyService: boolean;
  nationalId: string;
  nidDocument: string | null;
  passportNumber: string | null;
  dateOfBirth: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  address: string;
  city: string;
  area: string;
}
