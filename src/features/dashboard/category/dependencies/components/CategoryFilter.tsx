"use client";

import { AppSearch } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";

const CategoryFilter = () => {
  const { getFilter, setFilter } = useServerPagination();

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-center lg:w-auto lg:justify-end">
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
