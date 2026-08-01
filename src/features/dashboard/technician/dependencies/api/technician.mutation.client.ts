import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { IReviewTechnicianPayload } from "../types/technician.types";

//-----------------Admin---------------
export const reviewTechnician = (
  id: string,
  payload: IReviewTechnicianPayload,
) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.admin.technicians.approval(id),
    {
      method: "PATCH",
      body: payload,
    },
  );
