"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import type { TUserRole } from "@/src/lib/auth/auth.roles";
import { DEFAULT_ACCOUNT_STATUS } from "@/src/lib/options/filter.options";
import type { TAccountStatus } from "@/src/types/types";
import { userKeys } from "../api/user.key";
import { getAdminUsers } from "../api/user.query.client";
import type { IUserListQuery } from "../types/user.types";

// The URL is the filter, so the hook reads it itself.
const useUserFilter = (): IUserListQuery => {
  const { page, pageSize, getFilter } = useServerPagination();

  return {
    search: getFilter("search"),
    role: getFilter("role") as TUserRole | undefined,
    status: (getFilter("status") as TAccountStatus) ?? DEFAULT_ACCOUNT_STATUS,
    page,
    limit: pageSize,
  };
};

//-----------------Admin---------------
export const useAdminUsersQuery = () => {
  const filter = useUserFilter();

  return useQuery({
    queryKey: userKeys.admin.list(filter),
    queryFn: () => getAdminUsers(filter),
    select: (response) => ({
      items: response.data ?? [],
      total: response.meta?.total ?? 0,
    }),
    placeholderData: keepPreviousData,
  });
};
