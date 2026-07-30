import type { ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { StatusPill, Text, buildColumn } from "@/src/components";
import { formatDate, formatMoney } from "@/src/lib/utils/format.utils";
import type { ICustomerPaymentRow } from "../types/payment.types";

// A role's columns hook returns its row actions' modals alongside the columns,
// so the page renders {modals} next to the table.
export interface IPaymentColumns<TRow> {
  columns: ColumnDef<TRow>[];
  modals: ReactNode;
}

// The columns both payment tables show, in display order. Built against the
// customer row and widened once — the admin row extends it.
export const paymentBaseColumns = <TRow extends ICustomerPaymentRow>() =>
  buildColumn<ICustomerPaymentRow>([
    {
      id: "service",
      label: "Service",
      size: 240,
      render: (row: ICustomerPaymentRow) => (
        <div className="min-w-0 leading-tight">
          <span className="block truncate font-medium">{row.serviceTitle}</span>
          <Text
            variant="normal-xs"
            as="span"
            className="block truncate text-project-muted-foreground"
          >
            {row.method ? `${row.provider} · ${row.method}` : row.provider}
          </Text>
        </div>
      ),
    },
    {
      id: "amount",
      label: "Amount",
      size: 120,
      render: (row: ICustomerPaymentRow) => (
        <span className="font-semibold tabular-nums">
          {formatMoney(row.amount)}
        </span>
      ),
    },
    {
      id: "status",
      label: "Status",
      size: 140,
      render: (row: ICustomerPaymentRow) => <StatusPill status={row.status} />,
    },
    {
      id: "paidAt",
      label: "Paid on",
      size: 130,
      render: (row: ICustomerPaymentRow) => (
        <span className="whitespace-nowrap">
          {row.paidAt ? formatDate(row.paidAt) : "—"}
        </span>
      ),
    },
    {
      id: "createdAt",
      label: "Started",
      size: 130,
      render: (row: ICustomerPaymentRow) => (
        <span className="whitespace-nowrap">{formatDate(row.createdAt)}</span>
      ),
    },
  ]) as ColumnDef<TRow>[];
