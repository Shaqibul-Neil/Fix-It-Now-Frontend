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
  accountStatus,
  featured,
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
  if (featured !== undefined) params.set("featured", String(featured));
  // Removed profiles have no account status of their own — they arrive only
  // when the list is widened, which is what the "all" tab asks for.
  if (accountStatus === "all") params.set("includeDeleted", "true");
  else if (accountStatus) params.set("accountStatus", accountStatus);

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
