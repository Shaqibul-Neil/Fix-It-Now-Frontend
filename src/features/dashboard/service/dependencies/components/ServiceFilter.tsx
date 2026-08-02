"use client";

import { AppSearch, AppSelect, AppTabs } from "@/src/components";
import { useCategoryOptions } from "@/src/hooks/useCategoryOptions";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import {
  ALL_OPTION_VALUE,
  DEFAULT_RECORD_STATUS,
  FILTER_OPTIONS,
} from "@/src/lib/options/filter.options";

const SELECT_WIDTH = "min-w-0 flex-1 basis-40 lg:basis-0 lg:grow-2";

const SEARCH_WIDTH = "min-w-0 flex-1 basis-52 lg:basis-0 lg:grow-3";

interface IServiceFilterProps {
  showRecordStatus?: boolean;
  showTechnicianScope?: boolean;
}

const ServiceFilter = ({
  showRecordStatus,
  showTechnicianScope,
}: IServiceFilterProps) => {
  const { getFilter, setFilter } = useServerPagination();
  const categoryOptions = useCategoryOptions();

  return (
    <div className="flex flex-col gap-3">
      {showRecordStatus && (
        <AppTabs
          options={FILTER_OPTIONS.recordStatus.options}
          value={getFilter("status") ?? DEFAULT_RECORD_STATUS}
          onChange={(value) => setFilter("status", value)}
        />
      )}

      {/* Pairs at `sm`, then one nowrap row so nothing drops down alone. */}
      <div className="grid gap-3 sm:grid-cols-2 md:flex md:min-w-0 md:flex-nowrap md:items-center">
        <AppSearch
          value={getFilter("search") ?? ""}
          onChange={(value) => setFilter("search", value || undefined)}
          placeholder="Search a service..."
          containerClassName={SEARCH_WIDTH}
        />

        <AppSelect
          placeholder="All categories"
          options={[
            { label: "All categories", value: ALL_OPTION_VALUE },
            ...categoryOptions,
          ]}
          value={getFilter("category") ?? ALL_OPTION_VALUE}
          onChange={(value) =>
            setFilter(
              "category",
              value === ALL_OPTION_VALUE ? undefined : value,
            )
          }
          infiniteScroll
          containerClassName={SELECT_WIDTH}
        />

        {showTechnicianScope && (
          <>
            <AppSelect
              placeholder="All cities"
              options={FILTER_OPTIONS.city.options}
              value={getFilter("city") ?? ALL_OPTION_VALUE}
              onChange={(value) =>
                setFilter(
                  "city",
                  value === ALL_OPTION_VALUE ? undefined : value,
                )
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
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceFilter;
