import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "../types/category.types";

//-----------------Admin---------------
export const createCategory = (payload: ICreateCategoryPayload) =>
  clientFetch<{ id: string }>(apiEndpoints.dashboard.admin.categories.create, {
    method: "POST",
    body: payload,
  });

export const updateCategory = (id: string, payload: IUpdateCategoryPayload) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.admin.categories.update(id),
    {
      method: "PATCH",
      body: payload,
    },
  );

export const restoreCategory = (id: string) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.admin.categories.restore(id),
    {
      method: "PATCH",
    },
  );

export const deleteCategory = (id: string) =>
  clientFetch<{ id: string }>(
    apiEndpoints.dashboard.admin.categories.remove(id),
    {
      method: "DELETE",
    },
  );
