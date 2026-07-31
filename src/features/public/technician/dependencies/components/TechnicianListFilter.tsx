"use client";

import { AppSearch, AppSelect } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import {
  ALL_OPTION_VALUE,
  FILTER_OPTIONS,
} from "@/src/lib/options/filter.options";

const TechnicianListFilter = () => {
  const { getFilter, setFilter } = useServerPagination();

  return (
    <div className="flex flex-col gap-4">
      <AppSearch
        value={getFilter("search") ?? ""}
        onChange={(value) => setFilter("search", value || undefined)}
        placeholder="Search technicians..."
        containerClassName="w-full"
      />

      <AppSelect
        label="City"
        placeholder="All cities"
        options={FILTER_OPTIONS.city.options}
        value={getFilter("city") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter("city", value === ALL_OPTION_VALUE ? undefined : value)
        }
        infiniteScroll
        containerClassName="w-full"
      />

      <AppSelect
        label="Rating"
        placeholder="Any rating"
        options={FILTER_OPTIONS.minRating.options}
        value={getFilter("minRating") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter("minRating", value === ALL_OPTION_VALUE ? undefined : value)
        }
        containerClassName="w-full"
      />
    </div>
  );
};

export default TechnicianListFilter;
