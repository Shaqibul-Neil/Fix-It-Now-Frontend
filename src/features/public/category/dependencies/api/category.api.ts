import { serverFetch } from "@/src/lib/api/api.server";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { ICategory } from "../types/category.types";

// Public, unauthenticated read — the whole live list, unpaginated. An admin
// edits it rarely, so it is cached for an hour instead of per request.
export const getCategories = async (): Promise<ICategory[]> => {
  const { response } = await serverFetch<ICategory[]>(
    apiEndpoints.public.category.list,
    { next: { revalidate: 3600 } },
  );
  return response.data ?? [];
};
