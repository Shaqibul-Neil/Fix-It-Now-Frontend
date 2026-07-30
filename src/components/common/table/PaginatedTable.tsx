"use client";

import { useCallback } from "react";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
} from "@tanstack/react-table";
import { DataTable, DataTablePagination } from "@/src/components";

// What every server-paginated table receives from its page.
export interface IPaginatedTableProps<TRow> {
  data: TRow[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  emptyMessage?: string;
}

interface IPaginatedTableComponentProps<TRow>
  extends IPaginatedTableProps<TRow> {
  columns: ColumnDef<TRow>[];
}

const PaginatedTable = <TRow,>({
  data,
  columns,
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  emptyMessage,
}: IPaginatedTableComponentProps<TRow>) => {
  const pageIndex = page - 1;

  const onPaginationChange: OnChangeFn<PaginationState> = useCallback(
    (updater) => {
      const previous = { pageIndex, pageSize };
      const next = typeof updater === "function" ? updater(previous) : updater;

      if (next.pageSize !== pageSize) onPageSizeChange(next.pageSize);
      else if (next.pageIndex !== pageIndex) onPageChange(next.pageIndex + 1);
    },
    [pageIndex, pageSize, onPageChange, onPageSizeChange],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: total,
    // Backend meta sends total only.
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange,
  });

  return (
    <div className="flex w-full flex-col">
      <DataTable table={table} emptyMessage={emptyMessage} />
      <DataTablePagination table={table} />
    </div>
  );
};

export default PaginatedTable;
