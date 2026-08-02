import { serverFetch } from "@/src/lib/api/api.server";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  ICategoryDetails,
  ICategoryListItem,
  IPublicCategoryQuery,
} from "../types/category.types";

// Sort and limit are the only two the list accepts, and both are optional.
const buildQuery = ({ sort, limit }: IPublicCategoryQuery) => {
  const params = new URLSearchParams();

  if (sort) params.set("sort", sort);
  if (limit) params.set("limit", String(limit));

  return params.toString();
};

// Public, unauthenticated read — the whole live list, unpaginated. An admin
// edits it rarely, so it is cached for an hour instead of per request.
export const getCategories = async (
  query: IPublicCategoryQuery = {},
): Promise<ICategoryListItem[]> => {
  const search = buildQuery(query);

  const { response } = await serverFetch<ICategoryListItem[]>(
    search
      ? `${apiEndpoints.public.category.list}?${search}`
      : apiEndpoints.public.category.list,
    { next: { revalidate: 3600 } },
  );

  return response.data ?? [];
};

// Slug, not id — the URL a customer lands on is the one the backend looks up.
export const getCategoryBySlug = async (
  slug: string,
): Promise<ICategoryDetails | null> => {
  const { response } = await serverFetch<ICategoryDetails>(
    apiEndpoints.public.category.details(slug),
    { next: { revalidate: 600 } },
  );

  return response.data ?? null;
};
