"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { AppSearch, AppSelect, Text } from "@/src/components";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import { cn } from "@/src/lib/utils/cn";
import { TECHNICIAN_SORT_OPTIONS } from "../constants/technician.filters";
import TechnicianListFilter from "./TechnicianListFilter";
import type { ITechnicianFacets } from "../types/technician.types";

interface ITechnicianListToolbarProps {
  total: number;
  facets: ITechnicianFacets;
}

const TechnicianListToolbar = ({
  total,
  facets,
}: ITechnicianListToolbarProps) => {
  const { getFilter, setFilter } = useServerPagination();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 border border-project-border bg-project-card p-4 md:flex-row md:items-center md:justify-between">
      <AppSearch
        value={getFilter("search") ?? ""}
        onChange={(value) => setFilter("search", value || undefined)}
        placeholder="Search by name, city or area..."
        containerClassName="w-full md:max-w-xs"
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <Text
          variant="normal-sm"
          as="span"
          className="whitespace-nowrap text-project-muted-foreground"
        >
          {total} technician{total === 1 ? "" : "s"} found
        </Text>

        <AppSelect
          options={TECHNICIAN_SORT_OPTIONS}
          value={getFilter("sort") ?? "best_match"}
          onChange={(value) => setFilter("sort", value)}
          placeholder="Sort by"
          size="sm"
          containerClassName="w-full md:w-44"
        />

        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex h-9 cursor-pointer items-center justify-center gap-2 border border-project-primary bg-project-muted-primary px-4 text-sm font-medium text-project-primary transition-colors duration-300 hover:bg-project-primary hover:text-project-primary-foreground lg:hidden"
            >
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            showCloseButton={false}
            className={cn(
              "w-88 max-w-[88vw] gap-0 border-project-border bg-project-card p-0",
              "ease-[cubic-bezier(0.32,0.72,0,1)]",
              "data-[state=open]:duration-500 data-[state=closed]:duration-400",
            )}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-project-border px-5">
              <SheetTitle asChild>
                <Text
                  variant="medium-xs"
                  as="span"
                  className="uppercase tracking-[0.28em] text-project-primary"
                >
                  Filters
                </Text>
              </SheetTitle>

              <SheetClose
                aria-label="Close filters"
                className="cursor-pointer text-project-muted-foreground transition-colors duration-300 hover:text-project-primary"
              >
                <X className="size-5" />
              </SheetClose>
            </div>

            <div className="flex-1 overflow-y-auto">
              <TechnicianListFilter facets={facets} className="border-0" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default TechnicianListToolbar;
