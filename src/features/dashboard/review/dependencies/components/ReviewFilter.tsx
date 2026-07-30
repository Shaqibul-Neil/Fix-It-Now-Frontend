"use client";

import { AppSearch, AppSelect } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import {
  ALL_OPTION_VALUE,
  FILTER_OPTIONS,
} from "@/src/lib/options/filter.options";

interface IReviewFilterProps {
  // Only the admin route accepts `search`, and the technician list is pinned
  // to published rows so a status filter would have one answer.
  showSearch?: boolean;
  showStatus?: boolean;
}

const ReviewFilter = ({
  showSearch = false,
  showStatus = false,
}: IReviewFilterProps) => {
  const { getFilter, setFilter } = useServerPagination();

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-center lg:w-auto lg:justify-end">
      {showSearch && (
        <AppSearch
          value={getFilter("search") ?? ""}
          onChange={(value) => setFilter("search", value || undefined)}
          placeholder="Search by party or service..."
          containerClassName="w-full md:w-56 lg:w-72"
        />
      )}

      <AppSelect
        placeholder="All ratings"
        options={FILTER_OPTIONS.rating.options}
        value={getFilter("rating") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter("rating", value === ALL_OPTION_VALUE ? undefined : value)
        }
        containerClassName="w-full md:w-40"
      />

      {showStatus && (
        <AppSelect
          placeholder="All statuses"
          options={FILTER_OPTIONS.reviewStatus.options}
          value={getFilter("status") ?? ALL_OPTION_VALUE}
          onChange={(value) =>
            setFilter("status", value === ALL_OPTION_VALUE ? undefined : value)
          }
          containerClassName="w-full md:w-40"
        />
      )}
    </div>
  );
};

export default ReviewFilter;
