"use client";

import Link from "next/link";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { buildColumn, DataTable } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import type { IServiceRow } from "@/src/features/dashboard/service/dependencies/types/service.types";

const columns = buildColumn<IServiceRow>([
  {
    id: "title",
    label: "Service",
    render: (row: IServiceRow) => (
      <Link
        href={`/services/${row.id}`}
        className="font-medium text-project-accent hover:text-project-primary"
      >
        {row.title}
      </Link>
    ),
  },
  { key: "category", label: "Category" },
  {
    id: "price",
    label: "Price",
    render: (row: IServiceRow) => formatMoney(row.price),
  },
  {
    id: "duration",
    label: "Duration",
    render: (row: IServiceRow) =>
      row.estimatedDuration ? `${row.estimatedDuration} min` : "—",
  },
]);

const TechnicianServicesTable = ({ services }: { services: IServiceRow[] }) => {
  const table = useReactTable({
    data: services,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} emptyMessage="No active services yet." />;
};

export default TechnicianServicesTable;
