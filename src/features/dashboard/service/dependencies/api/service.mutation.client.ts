import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  ICreateServicePayload,
  IUpdateServicePayload,
} from "../types/service.types";

//-----------------Technician---------------
export const createService = (payload: ICreateServicePayload) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.technician.services.create,
    {
      method: "POST",
      body: payload,
    },
  );

export const updateService = (id: string, payload: IUpdateServicePayload) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.technician.services.update(id),
    {
      method: "PATCH",
      body: payload,
    },
  );

//-----------------Technician (own) + Admin (any)---------------
export const deleteService = (id: string) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.technician.services.remove(id),
    {
      method: "DELETE",
    },
  );
