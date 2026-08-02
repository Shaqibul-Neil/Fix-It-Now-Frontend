import type { ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { StatusPill, Text, buildColumn } from "@/src/components";
import {
  formatClock,
  formatDate,
  formatMoney,
} from "@/src/lib/utils/format.utils";
import type { IBookingRowBase } from "../types/booking.types";

// A role's columns hook returns its row actions' modals alongside the columns,
// so the page renders {modals} next to the table.
export interface IBookingColumns<TRow> {
  columns: ColumnDef<TRow>[];
  modals: ReactNode;
}

// The columns every role's booking table shows, in display order. Built against
// the base row and widened once — every role row extends it.
export const bookingBaseColumns = <TRow extends IBookingRowBase>() =>
  buildColumn<IBookingRowBase>([
    {
      id: "service",
      label: "Service",
      size: 240,
      render: (row: IBookingRowBase) => (
        <div className="min-w-0 leading-tight">
          <span className="block truncate font-medium">{row.serviceTitle}</span>
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
      key: "amount",
      label: "Amount",
      size: 110,
      render: (value: IBookingRowBase["amount"]) => (
        <span className="font-semibold tabular-nums">{formatMoney(value)}</span>
      ),
    },
    {
      key: "scheduledAt",
      label: "Scheduled",
      size: 150,
      render: (value: IBookingRowBase["scheduledAt"]) => (
        <div className="min-w-0 leading-tight">
          <span className="block whitespace-nowrap">{formatDate(value)}</span>

          <Text
            variant="normal-xs"
            as="span"
            className="block whitespace-nowrap text-project-muted-foreground"
          >
            {formatClock(value)}
          </Text>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      size: 150,
      render: (value: IBookingRowBase["status"]) => (
        <StatusPill status={value} />
      ),
    },
    {
      id: "timeline",
      label: "Timeline",
      size: 160,
      render: (row: IBookingRowBase) => (
        <div className="min-w-0 leading-tight">
          <span className="block whitespace-nowrap">
            {formatDate(row.createdAt)}
          </span>

          <Text
            variant="normal-xs"
            as="span"
            className="block whitespace-nowrap text-project-muted-foreground"
          >
            {row.completedAt
              ? `Completed ${formatDate(row.completedAt)}`
              : "Not completed"}
          </Text>
        </div>
      ),
    },
  ]) as ColumnDef<TRow>[];
