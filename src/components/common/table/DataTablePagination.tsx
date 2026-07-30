"use client";

import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { IconButton } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";

interface IDataTablePaginationProps<TData> {
  table: Table<TData>;
  className?: string;
  variant?: "default" | "minimal";
}

const PAGE_SIZES = [6, 12, 24, 48];

const DataTablePagination = <TData,>({
  table,
  className,
  variant = "default",
}: IDataTablePaginationProps<TData>) => {
  // A single page has nothing to page through.
  if (table.getPageCount() <= 1) return null;

  const canPrev = table.getCanPreviousPage();
  const canNext = table.getCanNextPage();

  const pageIndicator = (
    <span className="whitespace-nowrap text-sm font-semibold text-project-accent">
      Page {table.getState().pagination.pageIndex + 1} of{" "}
      {table.getPageCount() || 1}
    </span>
  );

  const navigation = (
    <div className="flex items-center gap-2">
      <IconButton
        onClick={() => table.setPageIndex(0)}
        disabled={!canPrev}
        className="hidden size-8 sm:flex"
        aria-label="First page"
      >
        <ChevronsLeft className="size-4" />
      </IconButton>

      <IconButton
        onClick={() => table.previousPage()}
        disabled={!canPrev}
        className="size-8"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </IconButton>

      <IconButton
        onClick={() => table.nextPage()}
        disabled={!canNext}
        className="size-8"
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </IconButton>

      <IconButton
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!canNext}
        className="hidden size-8 sm:flex"
        aria-label="Last page"
      >
        <ChevronsRight className="size-4" />
      </IconButton>
    </div>
  );

  // Tight pairing for cards and side panels.
  if (variant === "minimal") {
    return (
      <div
        className={cn("flex w-full items-center justify-between", className)}
      >
        {pageIndicator}
        {navigation}
      </div>
    );
  }

  return (
    // border-t-0 so it butts straight onto DataTable's own border.
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4 border border-t-0 border-project-border bg-project-card px-4 py-3 lg:flex-row",
        className,
      )}
    >
      {/* Row count, not selection — this table has no row checkboxes. */}
      <span className="whitespace-nowrap text-sm text-project-muted-foreground">
        Showing {table.getRowModel().rows.length} of {table.getRowCount()} rows
      </span>

      <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-7">
        <label className="flex items-center gap-2 text-sm font-medium text-project-accent">
          Rows per page
          <select
            className="h-9 cursor-pointer border border-project-border bg-project-background px-2 text-sm font-semibold text-project-accent outline-none transition-colors duration-300 hover:border-project-primary/50 focus:ring-1 focus:ring-project-primary"
            value={table.getState().pagination.pageSize}
            onChange={(event) => table.setPageSize(Number(event.target.value))}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        {pageIndicator}
        {navigation}
      </div>
    </div>
  );
};

export default DataTablePagination;
