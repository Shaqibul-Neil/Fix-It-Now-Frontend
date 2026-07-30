import { clientFetch } from "@/src/lib/api/api.client";
import { TTechnicianProfileInput } from "../schema/onboarding.schema";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import { ITechnicianProfile } from "../types/onboarding.types";

//---------Create Profile---------
export const createTechnicianProfile = (payload: TTechnicianProfileInput) =>
  clientFetch<ITechnicianProfile>(apiEndpoints.technician.profile, {
    method: "POST",
    body: payload,
  });
//-----------Rejected Technician reapply----
export const updateTechnicianProfile = (payload: TTechnicianProfileInput) =>
  clientFetch<ITechnicianProfile>(apiEndpoints.technician.profile, {
    method: "PATCH",
    body: payload,
  });
