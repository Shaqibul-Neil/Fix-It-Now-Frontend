"use client";

import { AppSearch, AppSelect, AppTabs } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import {
  ALL_OPTION_VALUE,
  DEFAULT_ACCOUNT_STATUS,
  FILTER_OPTIONS,
} from "@/src/lib/options/filter.options";

// Grow to fill the row, shrink with it — a fixed width wraps instead of fitting.
const SELECT_WIDTH = "min-w-0 flex-1 basis-40 lg:basis-0 lg:grow-2";

const SEARCH_WIDTH = "min-w-0 flex-1 basis-52 lg:basis-0 lg:grow-3";

const TechnicianFilter = () => {
  const { getFilter, setFilter } = useServerPagination();

  return (
    <div className="flex flex-col gap-3">
      <AppTabs
        options={FILTER_OPTIONS.approvalStatus.options}
        value={getFilter("approvalStatus") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter(
            "approvalStatus",
            value === ALL_OPTION_VALUE ? undefined : value,
          )
        }
      />

      {/* Pairs at `sm`, then one nowrap row so nothing drops down alone. */}
      <div className="grid gap-3 sm:grid-cols-2 md:flex md:min-w-0 md:flex-nowrap md:items-center">
        <AppSearch
          value={getFilter("search") ?? ""}
          onChange={(value) => setFilter("search", value || undefined)}
          placeholder="Search by name..."
          containerClassName={SEARCH_WIDTH}
        />

        <AppSelect
          placeholder="All cities"
          options={FILTER_OPTIONS.city.options}
          value={getFilter("city") ?? ALL_OPTION_VALUE}
          onChange={(value) =>
            setFilter("city", value === ALL_OPTION_VALUE ? undefined : value)
          }
          infiniteScroll
          containerClassName={SELECT_WIDTH}
        />

        <AppSelect
          placeholder="Any rating"
          options={FILTER_OPTIONS.minRating.options}
          value={getFilter("minRating") ?? ALL_OPTION_VALUE}
          onChange={(value) =>
            setFilter(
              "minRating",
              value === ALL_OPTION_VALUE ? undefined : value,
            )
          }
          containerClassName={SELECT_WIDTH}
        />

        {/* "all" is a real value here — it is what pulls removed accounts back. */}
        <AppSelect
          placeholder="Account status"
          options={FILTER_OPTIONS.accountStatus.options}
          value={getFilter("accountStatus") ?? DEFAULT_ACCOUNT_STATUS}
          onChange={(value) => setFilter("accountStatus", value)}
          containerClassName={SELECT_WIDTH}
        />
      </div>
    </div>
  );
};

export default TechnicianFilter;
