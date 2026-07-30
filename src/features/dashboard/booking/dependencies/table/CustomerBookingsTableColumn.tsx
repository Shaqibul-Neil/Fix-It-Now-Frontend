"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, CreditCard, Eye } from "lucide-react";
import { ActionColumn, ConfirmModal } from "@/src/components";
import type { TBookingStatus } from "@/src/types/types";
import {
  useCancelBookingMutation,
  useCreatePaymentMutation,
} from "../hooks/useBookingMutation";
import type { ICustomerBookingRow } from "../types/booking.types";
import {
  bookingBaseColumns,
  contactColumn,
  type IBookingColumns,
} from "./BookingColumns";

const CANCELABLE: TBookingStatus[] = ["REQUESTED", "ACCEPTED", "PAID"];
const PAYABLE: TBookingStatus[] = ["REQUESTED", "ACCEPTED"];

export const useCustomerBookingsColumns =
  (): IBookingColumns<ICustomerBookingRow> => {
    const router = useRouter();
    const [cancelling, setCancelling] = useState<ICustomerBookingRow | null>(
      null,
    );
    const [waiting, setWaiting] = useState<ICustomerBookingRow | null>(null);

    const cancelBooking = useCancelBookingMutation(() => setCancelling(null));
    const createPayment = useCreatePaymentMutation();

    const [service, ...rest] = bookingBaseColumns<ICustomerBookingRow>();

    return {
      columns: [
        service,

        contactColumn<ICustomerBookingRow>(
          "technician",
          "Technician",
          (row) => ({
            name: row.technicianName,
            email: row.technicianEmail,
            phone: row.technicianPhone,
          }),
        ),

        ...rest,

        ActionColumn<ICustomerBookingRow>(
          [
            {
              icon: Eye,
              label: "View details",
              variant: "noOutline",
              onClick: (row) =>
                router.push(`/dashboard/customer/bookings/${row.id}`),
            },
            {
              icon: CreditCard,
              label: "Pay now",
              variant: "primary",
              hidden: (row) => !PAYABLE.includes(row.status),
              // Only an accepted booking can be paid, so a requested one is
              // told why instead of hitting a backend error.
              onClick: (row) =>
                row.status === "ACCEPTED"
                  ? createPayment.mutate(row.id)
                  : setWaiting(row),
              disabled: createPayment.isPending,
            },
            {
              icon: Ban,
              label: "Cancel booking",
              variant: "destructive",
              hidden: (row) => !CANCELABLE.includes(row.status),
              onClick: setCancelling,
            },
          ],
          { size: 150 },
        ),
      ],

      modals: (
        <>
          <ConfirmModal
            isOpen={Boolean(cancelling)}
            onClose={() => setCancelling(null)}
            mode="cancel"
            title="Cancel this booking?"
            description="The technician is notified straight away. This cannot be undone."
            entityName={cancelling?.serviceTitle}
            isPending={cancelBooking.isPending}
            onConfirm={() => cancelling && cancelBooking.mutate(cancelling.id)}
          />

          <ConfirmModal
            isOpen={Boolean(waiting)}
            onClose={() => setWaiting(null)}
            mode="info"
            title="Waiting for the technician"
            description="Payment opens once the technician accepts this booking. You will be notified."
            entityName={waiting?.serviceTitle}
          />
        </>
      ),
    };
  };
