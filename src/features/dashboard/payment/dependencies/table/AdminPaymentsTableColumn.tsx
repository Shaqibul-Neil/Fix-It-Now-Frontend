"use client";

import { useRouter } from "next/navigation";
import { ClipboardList, Eye } from "lucide-react";
import {
  ActionColumn,
  ContactColumn,
  StatusPill,
  Text,
  buildColumn,
} from "@/src/components";
import type { IAdminPaymentRow } from "../types/payment.types";
import { paymentBaseColumns, type IPaymentColumns } from "./PaymentColumns";

export const useAdminPaymentsColumns = (): IPaymentColumns<IAdminPaymentRow> => {
  const router = useRouter();

  // The payer leads, then the job, then the rest of the shared columns.
  const [service, ...rest] = paymentBaseColumns<IAdminPaymentRow>();

  return {
    columns: [
      ContactColumn<IAdminPaymentRow>("customer", "Customer", (row) => ({
        name: row.customer.name,
        email: row.customer.email,
        phone: row.customer.phone,
      })),

      service,

      ...buildColumn<IAdminPaymentRow>([
        {
          id: "technician",
          label: "Technician",
          size: 160,
          render: (row: IAdminPaymentRow) => (
            <span className="block truncate">{row.technician.name}</span>
          ),
        },
      ]),

      ...rest,

      ...buildColumn<IAdminPaymentRow>([
        {
          id: "booking",
          label: "Booking",
          size: 150,
          render: (row: IAdminPaymentRow) => (
            <StatusPill status={row.bookingStatus} />
          ),
        },
        {
          id: "transactionId",
          label: "Reference",
          size: 200,
          render: (row: IAdminPaymentRow) => (
            <Text
              variant="normal-xs"
              as="span"
              className="block truncate text-project-muted-foreground"
            >
              {row.transactionId}
            </Text>
          ),
        },
      ]),

      ActionColumn<IAdminPaymentRow>(
        [
          {
            icon: Eye,
            label: "View payment",
            variant: "noOutline",
            onClick: (row) =>
              router.push(`/dashboard/admin/transactions/${row.id}`),
          },
          {
            icon: ClipboardList,
            label: "View booking",
            variant: "outline",
            onClick: (row) =>
              router.push(`/dashboard/admin/bookings/${row.bookingId}`),
          },
        ],
        { asDropdown: true, size: 90 },
      ),
    ],

    modals: null,
  };
};
