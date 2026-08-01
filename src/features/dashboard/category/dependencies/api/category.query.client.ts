import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { ICategory } from "../types/category.types";

export const getCategories = () =>
  clientFetch<ICategory[]>(apiEndpoints.dashboard.admin.categories.list);
