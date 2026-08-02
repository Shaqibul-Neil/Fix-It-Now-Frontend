import { serverFetch } from "@/src/lib/api/api.server";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import { getCategories } from "@/src/features/public/category/dependencies/api/category.api";
import type { IPublicServiceRow } from "@/src/features/public/service/dependencies/types/service.types";
import type { ICategory } from "@/src/features/public/category/dependencies/types/category.types";
import type { ITechnician } from "@/src/features/public/technician/dependencies/types/technician.types";

const HOME_SERVICE_COUNT = 5;
const HOME_TECHNICIAN_COUNT = 4;
const HOME_CATEGORY_COUNT = 5;

// Public, unauthenticated reads — hit the Express API directly instead of the
// BFF gateway, which requires a cookie. Time-based revalidation keeps this
// off the request path without going fully static.
export const getHomeServices = async (): Promise<IPublicServiceRow[]> => {
  const { response } = await serverFetch<IPublicServiceRow[]>(
    `${apiEndpoints.public.service.list}?limit=${HOME_SERVICE_COUNT}`,
    { next: { revalidate: 300 } },
  );
  return response.data ?? [];
};

// The category list is small and already cached, so the homepage previews it
// instead of asking the API for its own trimmed copy.
export const getHomeCategories = async (): Promise<ICategory[]> =>
  (await getCategories()).slice(0, HOME_CATEGORY_COUNT);

export const getHomeTechnicians = async (): Promise<ITechnician[]> => {
  const { response } = await serverFetch<ITechnician[]>(
    `${apiEndpoints.public.technician.list}?limit=${HOME_TECHNICIAN_COUNT}`,
    { next: { revalidate: 300 } },
  );
  return response.data ?? [];
};
