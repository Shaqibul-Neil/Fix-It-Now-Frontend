"use client";

import { AppSearch, AppSelect } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import {
  ALL_OPTION_VALUE,
  FILTER_OPTIONS,
} from "@/src/lib/options/filter.options";

// Only the admin route accepts `search`, so the customer page leaves it off.
const PaymentFilter = ({ showSearch = false }: { showSearch?: boolean }) => {
  const { getFilter, setFilter } = useServerPagination();

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-center lg:w-auto lg:justify-end">
      {showSearch && (
        <AppSearch
          value={getFilter("search") ?? ""}
          onChange={(value) => setFilter("search", value || undefined)}
          placeholder="Search by payer or reference..."
          containerClassName="w-full md:w-56 lg:w-72"
        />
      )}

      <AppSelect
        placeholder="All time"
        options={[
          { label: "All time", value: ALL_OPTION_VALUE },
          ...FILTER_OPTIONS.period.options,
        ]}
        value={getFilter("period") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter("period", value === ALL_OPTION_VALUE ? undefined : value)
        }
        containerClassName="w-full md:w-40"
      />

      <AppSelect
        placeholder="All statuses"
        options={FILTER_OPTIONS.paymentStatus.options}
        value={getFilter("status") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter("status", value === ALL_OPTION_VALUE ? undefined : value)
        }
        containerClassName="w-full md:w-40"
      />
    </div>
  );
};

export default PaymentFilter;
