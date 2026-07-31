import { serverFetch } from "@/src/lib/api/api.server";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IServiceListQuery,
  IServiceRow,
} from "@/src/features/dashboard/service/dependencies/types/service.types";

const buildQuery = ({ category, search, page, limit }: IServiceListQuery) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category) params.set("category", category);
  if (search) params.set("search", search);
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

export const getServiceById = async (id: string): Promise<IServiceRow | null> => {
  const { response } = await serverFetch<IServiceRow>(
    apiEndpoints.service.byId(id),
    { next: { revalidate: 60 } },
  );
  return response.data ?? null;
};
