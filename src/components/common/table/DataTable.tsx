"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

interface IDataTableProps<TData> {
  table: Table<TData>;
  emptyMessage?: string;
}

const DataTable = <TData,>({
  table,
  emptyMessage = "No results found.",
}: IDataTableProps<TData>) => {
  const rows = table.getRowModel().rows;

  return (
    // The inner table-container scrolls; the page itself never does.
    <div className="w-full border border-project-border bg-project-card">
      <ShadTable style={{ minWidth: table.getTotalSize() }}>
        <TableHeader className="bg-project-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-project-border hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-11 max-w-50 truncate px-4 text-xs font-semibold uppercase tracking-[0.16em] text-project-muted-foreground"
                  style={{ width: header.getSize() }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b border-project-border transition-colors duration-300 last:border-0 hover:bg-project-muted-primary/40"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    // No capitalize here — a cell renders exactly what its
                    // column handed it, enums included. Prettifying a status is
                    // StatusPill's job, not the table's.
                    className="h-14 px-4 font-medium text-project-foreground"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 px-4 text-center text-project-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ShadTable>
    </div>
  );
};

export default DataTable;
