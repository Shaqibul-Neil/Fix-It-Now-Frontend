"use client";

import { AppSearch, AppTabs } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import {
  DEFAULT_RECORD_STATUS,
  FILTER_OPTIONS,
} from "@/src/lib/options/filter.options";

const CategoryFilter = () => {
  const { getFilter, setFilter } = useServerPagination();

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <AppTabs
        options={FILTER_OPTIONS.recordStatus.options}
        value={getFilter("status") ?? DEFAULT_RECORD_STATUS}
        onChange={(value) => setFilter("status", value)}
      />

      <AppSearch
        value={getFilter("search") ?? ""}
        onChange={(value) => setFilter("search", value || undefined)}
        placeholder="Search a category..."
        containerClassName="w-full md:w-56 lg:w-72"
      />
    </div>
  );
};

export default CategoryFilter;
