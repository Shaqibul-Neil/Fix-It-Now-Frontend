import { serverFetch } from "@/src/lib/api/api.server";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { ICategory } from "../types/category.types";

// Full list, for filter dropdowns — unlike getHomeCategories this is not
// truncated to a homepage-sized preview.
export const getCategories = async (): Promise<ICategory[]> => {
  const { response } = await serverFetch<ICategory[]>(
    apiEndpoints.dashboard.admin.categories.list,
    { next: { revalidate: 3600 } },
  );
  return response.data ?? [];
};
