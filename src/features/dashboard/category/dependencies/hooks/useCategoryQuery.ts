"use client";

import { useQuery } from "@tanstack/react-query";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import { categoryKeys } from "../api/category.key";
import { getCategories } from "../api/category.query.client";

// The categories endpoint returns the whole list with no meta, so the search
// and the page are applied here instead of on the server.
export const useAdminCategoriesQuery = () => {
  const { page, pageSize, getFilter } = useServerPagination();
  const search = getFilter("search")?.trim().toLowerCase();

  return useQuery({
    queryKey: categoryKeys.admin.lists,
    queryFn: getCategories,
    select: (response) => {
      const rows = (response.data ?? []).filter((category) =>
        search ? category.name.toLowerCase().includes(search) : true,
      );

      return {
        items: rows.slice((page - 1) * pageSize, page * pageSize),
        total: rows.length,
      };
    },
  });
};
