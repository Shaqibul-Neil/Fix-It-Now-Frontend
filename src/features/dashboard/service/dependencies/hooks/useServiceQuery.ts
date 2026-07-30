"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import { serviceKeys } from "../api/service.key";
import { getServices } from "../api/service.query.client";
import type { IServiceListQuery } from "../types/service.types";

const useServiceFilter = (): IServiceListQuery => {
  const { page, pageSize, getFilter } = useServerPagination();

  return {
    category: getFilter("category"),
    search: getFilter("search"),
    page,
    limit: pageSize,
  };
};

export const useServicesQuery = () => {
  const filter = useServiceFilter();

  return useQuery({
    queryKey: serviceKeys.list(filter),
    queryFn: () => getServices(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};
