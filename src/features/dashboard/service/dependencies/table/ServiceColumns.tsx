import type { ColumnDef } from "@tanstack/react-table";
import { Text, buildColumn } from "@/src/components";
import { formatDateTime, formatMoney } from "@/src/lib/utils/format.utils";
import type { IBaseServiceRow } from "../types/service.types";
import { formatDate } from "date-fns";

export const serviceBaseColumns = <TRow extends IBaseServiceRow>() =>
  buildColumn<IBaseServiceRow>([
    {
      id: "service",
      label: "Service",
      size: 280,
      render: (row: IBaseServiceRow) => (
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
      id: "price",
      label: "Price",
      size: 110,
      render: (row: IBaseServiceRow) => (
        <span className="font-semibold tabular-nums">
          {formatMoney(row.price)}
        </span>
      ),
    },

    {
      id: "estimatedDuration",
      label: "Duration",
      size: 110,
      render: (row: IBaseServiceRow) => (
        <span className="whitespace-nowrap">
          {row.estimatedDuration ? `${row.estimatedDuration} min` : "—"}
        </span>
      ),
    },

    {
      id: "description",
      label: "About",
      size: 320,
      render: (row: IBaseServiceRow) => (
        <span className="line-clamp-2 text-project-muted-foreground">
          {row.description ?? "—"}
        </span>
      ),
    },
    {
      id: "createdAt",
      label: "Created At",
      size: 130,
      render: (row: IBaseServiceRow) => (
        <span className="whitespace-nowrap">
          {formatDateTime(row.createdAt)}
        </span>
      ),
    },
    {
      id: "updatedAt",
      label: "Updated At",
      size: 130,
      render: (row: IBaseServiceRow) => (
        <span className="whitespace-nowrap">
          {formatDateTime(row.updatedAt)}
        </span>
      ),
    },
  ]) as ColumnDef<TRow>[];
