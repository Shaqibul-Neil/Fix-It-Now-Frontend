"use client";

import { AppSearch, AppSelect } from "@/src/components";
import { useCategoryOptions } from "@/src/hooks/useCategoryOptions";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import {
  ALL_OPTION_VALUE,
  FILTER_OPTIONS,
} from "@/src/lib/options/filter.options";

const ServiceFilter = () => {
  const { getFilter, setFilter } = useServerPagination();
  const categoryOptions = useCategoryOptions();

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-center lg:w-auto lg:justify-end">
      <AppSearch
        value={getFilter("search") ?? ""}
        onChange={(value) => setFilter("search", value || undefined)}
        placeholder="Search a service..."
        containerClassName="w-full md:w-56 lg:w-72"
      />

      <AppSelect
        placeholder="All categories"
        options={[
          { label: "All categories", value: ALL_OPTION_VALUE },
          ...categoryOptions,
        ]}
        value={getFilter("category") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter("category", value === ALL_OPTION_VALUE ? undefined : value)
        }
        infiniteScroll
        containerClassName="w-full md:w-44"
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

export default ServiceFilter;
