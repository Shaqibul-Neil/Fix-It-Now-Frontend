import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IAdminTechnicianDetails,
  IAdminTechnicianRow,
  ITechnicianListQuery,
} from "../types/technician.types";

const buildQuery = ({
  search,
  city,
  minRating,
  approvalStatus,
  page,
  limit,
}: ITechnicianListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) params.set("search", search);
  if (city) params.set("city", city);
  if (minRating) params.set("minRating", minRating);
  if (approvalStatus) params.set("approvalStatus", approvalStatus);

  return `?${params.toString()}`;
};

//-----------------Admin---------------
export const getAdminTechnicians = (query: ITechnicianListQuery) =>
  clientFetch<IAdminTechnicianRow[]>(
    `${apiEndpoints.dashboard.admin.technicians.list}${buildQuery(query)}`,
  );

export const getAdminTechnicianDetails = (id: string) =>
  clientFetch<IAdminTechnicianDetails>(
    apiEndpoints.dashboard.admin.technicians.details(id),
  );
