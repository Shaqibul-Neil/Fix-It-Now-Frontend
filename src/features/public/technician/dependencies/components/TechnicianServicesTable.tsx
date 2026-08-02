"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { buildColumn, DataTable } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import type { IPublicServiceRow } from "@/src/features/public/service/dependencies/types/service.types";

const columns = buildColumn<IPublicServiceRow>([
  { key: "title", label: "Service" },
  { key: "category", label: "Category" },
  {
    id: "price",
    label: "Price",
    render: (row: IPublicServiceRow) => formatMoney(row.price),
  },
  {
    id: "duration",
    label: "Duration",
    render: (row: IPublicServiceRow) =>
      row.estimatedDuration ? `${row.estimatedDuration} min` : "—",
  },
]);

const TechnicianServicesTable = ({
  services,
}: {
  services: IPublicServiceRow[];
}) => {
  const table = useReactTable({
    data: services,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} emptyMessage="No active services yet." />;
};

export default TechnicianServicesTable;
