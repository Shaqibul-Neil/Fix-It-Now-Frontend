import type { ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { StatusPill, Text, buildColumn } from "@/src/components";
import {
  formatDate,
  formatDateTime,
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
      id: "amount",
      label: "Amount",
      size: 110,
      render: (row: IBookingRowBase) => (
        <span className="font-semibold tabular-nums">
          {formatMoney(row.amount)}
        </span>
      ),
    },
    {
      id: "scheduledAt",
      label: "Scheduled",
      size: 170,
      render: (row: IBookingRowBase) => (
        <span className="whitespace-nowrap">
          {formatDateTime(row.scheduledAt)}
        </span>
      ),
    },
    {
      id: "status",
      label: "Status",
      size: 150,
      render: (row: IBookingRowBase) => <StatusPill status={row.status} />,
    },
    {
      id: "createdAt",
      label: "Placed",
      size: 130,
      render: (row: IBookingRowBase) => (
        <span className="whitespace-nowrap">{formatDate(row.createdAt)}</span>
      ),
    },
    {
      id: "completedAt",
      label: "Completed",
      size: 130,
      render: (row: IBookingRowBase) => (
        <span className="whitespace-nowrap">
          {row.completedAt ? formatDate(row.completedAt) : "—"}
        </span>
      ),
    },
  ]) as ColumnDef<TRow>[];

// Name + email + phone in one cell
export const contactColumn = <TRow,>(
  id: string,
  label: string,
  read: (row: TRow) => { name: string; email: string; phone: string | null },
): ColumnDef<TRow> => ({
  id,
  header: label,
  size: 230,
  cell: ({ row }) => {
    const { name, email, phone } = read(row.original);

    return (
      <div className="min-w-0 leading-tight">
        <span className="block truncate font-medium">{name}</span>
        <Text
          variant="normal-xs"
          as="span"
          className="block truncate text-project-muted-foreground"
        >
          {email}
        </Text>
        <Text
          variant="normal-xs"
          as="span"
          className="block truncate text-project-muted-foreground"
        >
          {phone ?? "—"}
        </Text>
      </div>
    );
  },
});
