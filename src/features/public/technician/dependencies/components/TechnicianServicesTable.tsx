"use client";

import Image from "next/image";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { buildColumn, DataTable, Text } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import type { ITechnicianService } from "../types/technician.types";

const columns = buildColumn<ITechnicianService>([
  {
    id: "service",
    label: "Service",
    size: 320,
    render: (row: ITechnicianService) => (
      <div className="flex min-w-0 items-center gap-3">
        <span className="relative size-11 shrink-0 overflow-hidden border border-project-border bg-project-muted">
          {row.categoryImage && (
            <Image
              src={row.categoryImage}
              alt=""
              fill
              unoptimized
              sizes="44px"
              className="object-cover"
            />
          )}
        </span>

        <div className="min-w-0 leading-tight">
          <span className="block truncate font-medium">{row.title}</span>

          <Text
            variant="normal-xs"
            as="span"
            className="block truncate text-project-muted-foreground"
          >
            {row.category}
          </Text>
        </div>
      </div>
    ),
  },

  {
    key: "estimatedDuration",
    label: "Duration",
    size: 130,
    render: (value: ITechnicianService["estimatedDuration"]) => (
      <span className="whitespace-nowrap tabular-nums">
        {value ? `${value} min` : "—"}
      </span>
    ),
  },

  {
    key: "price",
    label: "Price",
    size: 130,
    render: (value: ITechnicianService["price"]) => (
      <span className="font-semibold tabular-nums text-project-accent">
        {formatMoney(value)}
      </span>
    ),
  },
]);

const TechnicianServicesTable = ({
  services,
}: {
  services: ITechnicianService[];
}) => {
  const table = useReactTable({
    data: services,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} emptyMessage="No active service yet." />;
};

export default TechnicianServicesTable;
