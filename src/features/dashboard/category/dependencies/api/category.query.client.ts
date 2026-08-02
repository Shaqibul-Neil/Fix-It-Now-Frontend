import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IAdminCategoryRow,
  ICategoryListQuery,
} from "../types/category.types";

const buildQuery = ({ search, status, page, limit }: ICategoryListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) params.set("search", search);
  if (status) params.set("status", status);

  return `?${params.toString()}`;
};

//-----------------Admin---------------
export const getAdminCategories = (query: ICategoryListQuery) =>
  clientFetch<IAdminCategoryRow[]>(
    `${apiEndpoints.dashboard.admin.categories.list}${buildQuery(query)}`,
  );
