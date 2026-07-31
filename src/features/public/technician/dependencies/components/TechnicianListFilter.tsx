"use client";

import { AppSearch } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";

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
    </div>
  );
};

export default TechnicianListFilter;
