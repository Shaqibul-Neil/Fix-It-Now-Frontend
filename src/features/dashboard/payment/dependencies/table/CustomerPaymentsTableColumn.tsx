"use client";

import { useRouter } from "next/navigation";
import { ClipboardList, Eye } from "lucide-react";
import { ActionColumn } from "@/src/components";
import type { ICustomerPaymentRow } from "../types/payment.types";
import { paymentBaseColumns, type IPaymentColumns } from "./PaymentColumns";

export const useCustomerPaymentsColumns =
  (): IPaymentColumns<ICustomerPaymentRow> => {
    const router = useRouter();

    return {
      columns: [
        ...paymentBaseColumns<ICustomerPaymentRow>(),

        ActionColumn<ICustomerPaymentRow>(
          [
            {
              icon: Eye,
              label: "View receipt",
              variant: "noOutline",
              onClick: (row) =>
                router.push(`/dashboard/customer/payments/${row.id}`),
            },
            {
              icon: ClipboardList,
              label: "View booking",
              variant: "outline",
              onClick: (row) =>
                router.push(`/dashboard/customer/bookings/${row.bookingId}`),
            },
          ],
          { asDropdown: true, size: 90 },
        ),
      ],

      modals: null,
    };
  };
