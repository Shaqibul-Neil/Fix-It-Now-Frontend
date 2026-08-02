import { serverFetch } from "@/src/lib/api/api.server";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IPublicTechnicianQuery,
  ITechnician,
  ITechnicianDetails,
  ITechnicianFacets,
} from "../types/technician.types";

// Checkbox groups go out as repeated keys; a toggle is sent only when it is on.
const buildQuery = ({
  search,
  city,
  categoryIds,
  skills,
  priceBuckets,
  minRating,
  sort,
  acceptingClients,
  eveningAvailable,
  weekendAvailable,
  emergencyService,
  featured,
  page,
  limit,
}: IPublicTechnicianQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) params.set("search", search);
  if (minRating) params.set("minRating", minRating);
  if (sort) params.set("sort", sort);

  city?.forEach((value) => params.append("city", value));
  categoryIds?.forEach((value) => params.append("categoryIds", value));
  skills?.forEach((value) => params.append("skills", value));
  priceBuckets?.forEach((value) => params.append("priceBuckets", value));

  if (acceptingClients) params.set("acceptingClients", "true");
  if (eveningAvailable) params.set("eveningAvailable", "true");
  if (weekendAvailable) params.set("weekendAvailable", "true");
  if (emergencyService) params.set("emergencyService", "true");
  if (featured) params.set("featured", "true");

  return params.toString();
};

// Reads one page of technicians with the filter sidebar applied.
export const getTechnicians = async (
  query: IPublicTechnicianQuery,
): Promise<{ items: ITechnician[]; total: number }> => {
  const { response } = await serverFetch<ITechnician[]>(
    `${apiEndpoints.public.technician.list}?${buildQuery(query)}`,
    { next: { revalidate: 60 } },
  );
  return { items: response.data ?? [], total: response.meta?.total ?? 0 };
};

// The counts behind the sidebar labels.
export const getTechnicianFacets = async (): Promise<ITechnicianFacets> => {
  const { response } = await serverFetch<ITechnicianFacets>(
    apiEndpoints.public.technician.filters,
    { next: { revalidate: 600 } },
  );

  return (
    response.data ?? {
      categories: [],
      skills: [],
      priceBuckets: [],
      sortOptions: [],
    }
  );
};

export const getTechnicianById = async (
  id: string,
): Promise<ITechnicianDetails | null> => {
  const { response } = await serverFetch<ITechnicianDetails>(
    apiEndpoints.public.technician.details(id),
    { next: { revalidate: 60 } },
  );
  return response.data ?? null;
};
