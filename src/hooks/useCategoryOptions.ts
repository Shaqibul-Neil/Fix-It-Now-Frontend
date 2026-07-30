"use client";

import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { TSelectOption } from "@/src/types/filter.types";

interface ICategory {
  id: string;
  name: string;
  slug: string;
}

export const useCategoryOptions = (): TSelectOption[] => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => clientFetch<ICategory[]>(apiEndpoints.category.list),
    select: (response) =>
      (response.data ?? []).map(({ name, slug }) => ({
        label: name,
        value: slug,
      })),
    staleTime: Infinity,
  });

  return data ?? [];
};
