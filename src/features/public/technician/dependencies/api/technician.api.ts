import { serverFetch } from "@/src/lib/api/api.server";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { IPublicAvailabilitySlot } from "@/src/features/dashboard/availability/dependencies/types/availability.types";
import type {
  IPublicTechnicianQuery,
  ITechnician,
  ITechnicianDetails,
} from "../types/technician.types";

const buildQuery = ({ search, city, minRating, page, limit }: IPublicTechnicianQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search) params.set("search", search);
  if (city) params.set("city", city);
  if (minRating) params.set("minRating", minRating);
  return params.toString();
};

// Public, unauthenticated reads — same convention as home.api.ts.
export const getTechnicians = async (
  query: IPublicTechnicianQuery,
): Promise<{ items: ITechnician[]; total: number }> => {
  const { response } = await serverFetch<ITechnician[]>(
    `${apiEndpoints.technicianPublic.list}?${buildQuery(query)}`,
    { next: { revalidate: 60 } },
  );
  return { items: response.data ?? [], total: response.meta?.total ?? 0 };
};

export const getTechnicianById = async (
  id: string,
): Promise<ITechnicianDetails | null> => {
  const { response } = await serverFetch<ITechnicianDetails>(
    apiEndpoints.technicianPublic.byId(id),
    { next: { revalidate: 60 } },
  );
  return response.data ?? null;
};

export const getTechnicianAvailability = async (
  id: string,
): Promise<IPublicAvailabilitySlot[]> => {
  const { response } = await serverFetch<IPublicAvailabilitySlot[]>(
    apiEndpoints.technicianPublic.availability(id),
    { next: { revalidate: 300 } },
  );
  return response.data ?? [];
};
