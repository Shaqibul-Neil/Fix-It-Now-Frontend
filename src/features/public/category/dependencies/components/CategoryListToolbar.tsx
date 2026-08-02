"use client";

import { AppSelect, Text } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import { ALL_OPTION_VALUE } from "@/src/lib/options/filter.options";
import {
  CATEGORY_LIMIT_OPTIONS,
  CATEGORY_SORT_OPTIONS,
} from "../constants/category.filters";

const CategoryListToolbar = ({ total }: { total: number }) => {
  const { getFilter, setFilter } = useServerPagination();

  return (
    <div className="flex flex-col gap-4 border border-project-border bg-project-card p-4 md:flex-row md:items-center md:justify-between">
      <Text
        variant="normal-sm"
        as="span"
        className="whitespace-nowrap text-project-muted-foreground"
      >
        {total} trade{total === 1 ? "" : "s"} shown
      </Text>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <AppSelect
          options={CATEGORY_SORT_OPTIONS}
          value={getFilter("sort") ?? "name"}
          onChange={(value) => setFilter("sort", value)}
          placeholder="Sort by"
          size="sm"
          containerClassName="w-full sm:w-44"
        />

        <AppSelect
          options={CATEGORY_LIMIT_OPTIONS}
          value={getFilter("limit") ?? ALL_OPTION_VALUE}
          onChange={(value) => setFilter("limit", value)}
          placeholder="How many"
          size="sm"
          containerClassName="w-full sm:w-36"
        />
      </div>
    </div>
  );
};

export default CategoryListToolbar;
