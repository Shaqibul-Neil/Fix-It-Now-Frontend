import Image from "next/image";
import { StatusPill, Text, buildColumn } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import type { IAdminTechnicianService } from "../types/technician.types";

// Columns for a technician's service list, including paused and removed rows.
export const technicianServiceColumns = buildColumn<IAdminTechnicianService>([
  {
    id: "service",
    label: "Service",
    size: 320,
    render: (row: IAdminTechnicianService) => (
      <div className="flex min-w-0 items-center gap-3">
        <span className="relative size-10 shrink-0 overflow-hidden border border-project-border bg-project-muted">
          {row.categoryImage && (
            <Image
              src={row.categoryImage}
              alt=""
              fill
              unoptimized
              sizes="40px"
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
    key: "price",
    label: "Price",
    size: 130,
    render: (value: string) => (
      <span className="font-semibold tabular-nums">{formatMoney(value)}</span>
    ),
  },

  {
    key: "estimatedDuration",
    label: "Duration",
    size: 120,
    render: (value: number | null) => (
      <span className="whitespace-nowrap tabular-nums">
        {value ? `${value} min` : "—"}
      </span>
    ),
  },

  {
    id: "status",
    label: "Status",
    size: 150,
    render: (row: IAdminTechnicianService) => (
      <StatusPill
        status={row.isDeleted ? "DELETED" : row.isActive ? "ACTIVE" : "PAUSED"}
      />
    ),
  },
]);
