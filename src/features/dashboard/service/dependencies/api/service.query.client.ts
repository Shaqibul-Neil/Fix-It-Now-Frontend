import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IServiceListQuery,
  IServiceRow,
} from "../types/service.types";

const buildQuery = ({ category, search, page, limit }: IServiceListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (category) params.set("category", category);
  if (search) params.set("search", search);

  return `?${params.toString()}`;
};

export const getServices = (query: IServiceListQuery) =>
  clientFetch<IServiceRow[]>(`${apiEndpoints.service.list}${buildQuery(query)}`);
