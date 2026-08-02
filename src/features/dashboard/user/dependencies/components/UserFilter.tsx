"use client";

import { AppSearch, AppSelect, AppTabs } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import {
  ALL_OPTION_VALUE,
  DEFAULT_ACCOUNT_STATUS,
  FILTER_OPTIONS,
} from "@/src/lib/options/filter.options";

// Grow to fill the row, shrink with it — a fixed width wraps instead of fitting.
const SELECT_WIDTH = "min-w-0 flex-1 basis-40 lg:basis-0 lg:grow-1";

const SEARCH_WIDTH = "min-w-0 flex-1 basis-52 lg:basis-0 lg:grow-2";

const UserFilter = () => {
  const { getFilter, setFilter } = useServerPagination();

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:flex md:min-w-0 md:flex-nowrap md:items-center">
      <AppTabs
        options={FILTER_OPTIONS.accountStatus.options}
        value={getFilter("status") ?? DEFAULT_ACCOUNT_STATUS}
        onChange={(value) => setFilter("status", value)}
      />

      <AppSearch
        value={getFilter("search") ?? ""}
        onChange={(value) => setFilter("search", value || undefined)}
        placeholder="Search by name or email..."
        containerClassName={SEARCH_WIDTH}
      />

      <AppSelect
        placeholder="All roles"
        options={FILTER_OPTIONS.role.options}
        value={getFilter("role") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter("role", value === ALL_OPTION_VALUE ? undefined : value)
        }
        containerClassName={SELECT_WIDTH}
      />
    </div>
  );
};

export default UserFilter;
