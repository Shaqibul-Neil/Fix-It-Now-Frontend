import { StatusPill, Text, buildColumn } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import type { ITechnicianService } from "../types/technician.types";

// The services embedded in the admin technician read — removed listings
// included, which is why the row carries a status of its own.
export const technicianServiceColumns = buildColumn<ITechnicianService>([
  {
    id: "service",
    label: "Service",
    size: 320,
    render: (row: ITechnicianService) => (
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
    id: "status",
    label: "Status",
    size: 150,
    render: (row: ITechnicianService) => (
      <StatusPill
        status={row.isDeleted ? "DELETED" : row.isActive ? "ACTIVE" : "PAUSED"}
      />
    ),
  },
]);
