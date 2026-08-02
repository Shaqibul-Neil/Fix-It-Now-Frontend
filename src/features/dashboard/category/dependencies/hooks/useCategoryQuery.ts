"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import { DEFAULT_RECORD_STATUS } from "@/src/lib/options/filter.options";
import type { TRecordStatus } from "@/src/types/types";
import { categoryKeys } from "../api/category.key";
import { getAdminCategories } from "../api/category.query.client";
import type { ICategoryListQuery } from "../types/category.types";

// The URL is the filter, so the hook reads it itself.
const useCategoryFilter = (): ICategoryListQuery => {
  const { page, pageSize, getFilter } = useServerPagination();

  return {
    search: getFilter("search"),
    status: (getFilter("status") as TRecordStatus) ?? DEFAULT_RECORD_STATUS,
    page,
    limit: pageSize,
  };
};

//-----------------Admin---------------
export const useAdminCategoriesQuery = () => {
  const filter = useCategoryFilter();

  return useQuery({
    queryKey: categoryKeys.admin.list(filter),
    queryFn: () => getAdminCategories(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};
