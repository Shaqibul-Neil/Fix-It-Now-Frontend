"use client";

import { AppSearch, AppSelect } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import { ALL_OPTION_VALUE } from "@/src/lib/options/filter.options";

const ServiceListFilter = ({
  categoryOptions,
}: {
  categoryOptions: { label: string; value: string }[];
}) => {
  const { getFilter, setFilter } = useServerPagination();

  return (
    <div className="flex flex-col gap-4">
      <AppSearch
        value={getFilter("search") ?? ""}
        onChange={(value) => setFilter("search", value || undefined)}
        placeholder="Search services..."
        containerClassName="w-full"
      />

      <AppSelect
        label="Category"
        placeholder="All categories"
        options={[
          { label: "All categories", value: ALL_OPTION_VALUE },
          ...categoryOptions,
        ]}
        value={getFilter("category") ?? ALL_OPTION_VALUE}
        onChange={(value) =>
          setFilter("category", value === ALL_OPTION_VALUE ? undefined : value)
        }
        containerClassName="w-full"
      />
    </div>
  );
};

export default ServiceListFilter;
