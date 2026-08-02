"use client";

import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { ICategory } from "@/src/features/public/category/dependencies/types/category.types";
import type { TSelectOption } from "@/src/types/filter.types";

// Filters key services by `slug`; forms that create/update a service need
// the actual `id` to satisfy the backend's categoryId field.
export const useCategoryOptions = (
  valueKey: "slug" | "id" = "slug",
): TSelectOption[] => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => clientFetch<ICategory[]>(apiEndpoints.public.category.list),
    select: (response) =>
      (response.data ?? []).map((category) => ({
        label: category.name,
        value: category[valueKey],
      })),
    staleTime: Infinity,
  });

  return data ?? [];
};
