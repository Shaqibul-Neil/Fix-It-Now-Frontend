import { serverFetch } from "@/src/lib/api/api.server";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IServiceListQuery,
  IServiceRow,
} from "@/src/features/dashboard/service/dependencies/types/service.types";

const buildQuery = ({
  search,
  category,
  page,
  limit,
  city,
  minRating,
}: IServiceListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (city) params.set("city", city);
  if (minRating) params.set("minRating", minRating);
  return params.toString();
};

// Public, unauthenticated reads — same convention as home.api.ts.
export const getServices = async (
  query: IServiceListQuery,
): Promise<{ items: IServiceRow[]; total: number }> => {
  const { response } = await serverFetch<IServiceRow[]>(
    `${apiEndpoints.service.list}?${buildQuery(query)}`,
    { next: { revalidate: 60 } },
  );
  return { items: response.data ?? [], total: response.meta?.total ?? 0 };
};
