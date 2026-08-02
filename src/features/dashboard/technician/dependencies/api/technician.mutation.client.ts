import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IReviewTechnicianPayload,
  IUpdateFeaturedPayload,
} from "../types/technician.types";

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

// Turns a technician's featured flag on or off.
export const updateFeaturedStatus = (
  id: string,
  payload: IUpdateFeaturedPayload,
) =>
  clientFetch<{ id: string; isFeatured: boolean }>(
    apiEndpoints.dashboard.admin.technicians.featured(id),
    {
      method: "PATCH",
      body: payload,
    },
  );
