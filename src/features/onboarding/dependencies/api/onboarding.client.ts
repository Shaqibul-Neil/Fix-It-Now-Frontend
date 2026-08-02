import { clientFetch } from "@/src/lib/api/api.client";
import { TTechnicianProfilePayload } from "../schema/onboarding.schema";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import { ITechnicianProfile } from "../types/onboarding.types";

//---------Create Profile---------
export const createTechnicianProfile = (payload: TTechnicianProfilePayload) =>
  clientFetch<ITechnicianProfile>(
    apiEndpoints.dashboard.technician.profile.create,
    {
      method: "POST",
      body: payload,
    },
  );
//-----------Rejected Technician reapply----
export const updateTechnicianProfile = (payload: TTechnicianProfilePayload) =>
  clientFetch<ITechnicianProfile>(
    apiEndpoints.dashboard.technician.profile.update,
    {
      method: "PATCH",
      body: payload,
    },
  );
