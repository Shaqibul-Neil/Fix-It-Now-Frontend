"use client";

import { AppSearch, AppSelect } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import {
  ALL_OPTION_VALUE,
  FILTER_OPTIONS,
} from "@/src/lib/options/filter.options";

const TechnicianFilter = () => {
  const { getFilter, setFilter } = useServerPagination();

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-center lg:w-auto lg:justify-end">
      <AppSearch
        value={getFilter("search") ?? ""}
        onChange={(value) => setFilter("search", value || undefined)}
        placeholder="Search by name..."
        containerClassName="w-full md:w-56 lg:w-72"
      />

      <AppSelect
        placeholder="All cities"
        options={FILTER_OPTIONS.city.options}
        value={getFilter("city") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter("city", value === ALL_OPTION_VALUE ? undefined : value)
        }
        containerClassName="w-full md:w-40"
      />

      <AppSelect
        placeholder="Any rating"
        options={FILTER_OPTIONS.minRating.options}
        value={getFilter("minRating") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter("minRating", value === ALL_OPTION_VALUE ? undefined : value)
        }
        containerClassName="w-full md:w-40"
      />

      <AppSelect
        placeholder="All applications"
        options={FILTER_OPTIONS.approvalStatus.options}
        value={getFilter("approvalStatus") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter(
            "approvalStatus",
            value === ALL_OPTION_VALUE ? undefined : value,
          )
        }
        containerClassName="w-full md:w-44"
      />
    </div>
  );
};

export default TechnicianFilter;
