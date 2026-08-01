import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IAvailabilitySlot,
  IPublicAvailabilitySlot,
  ISetAvailabilityPayload,
} from "../types/availability.types";

//-----------------Technician---------------
export const getMyAvailability = () =>
  clientFetch<IAvailabilitySlot[]>(
    apiEndpoints.dashboard.technician.availability.myAvailability,
  );

// PUT replaces the whole schedule in one write, so the page saves once.
export const setMyAvailability = (payload: ISetAvailabilityPayload) =>
  clientFetch<IAvailabilitySlot[]>(
    apiEndpoints.dashboard.technician.availability.update,
    {
      method: "PUT",
      body: payload,
    },
  );

//-----------------Public---------------
export const getTechnicianAvailability = (technicianId: string) =>
  clientFetch<IPublicAvailabilitySlot[]>(
    apiEndpoints.public.technician.availability(technicianId),
  );
