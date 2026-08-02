"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, CreditCard, Eye, Star } from "lucide-react";
import { ActionColumn, ConfirmModal, ContactColumn } from "@/src/components";
import ReviewFormPanel from "@/src/features/dashboard/review/dependencies/components/ReviewFormPanel";
import type { IReviewTarget } from "@/src/features/dashboard/review/dependencies/types/review.types";
import {
  cancelBlockedReason,
  payBlockedReason,
  reviewBlockedReason,
  type IBlockedAction,
} from "../booking.rules";
import {
  useCancelBookingMutation,
  useCreatePaymentMutation,
} from "../hooks/useBookingMutation";
import type { ICustomerBookingRow } from "../types/booking.types";
import { bookingBaseColumns, type IBookingColumns } from "./BookingColumns";

export const useCustomerBookingsColumns =
  (): IBookingColumns<ICustomerBookingRow> => {
    const router = useRouter();
    const [cancelling, setCancelling] = useState<ICustomerBookingRow | null>(
      null,
    );
    const [reviewing, setReviewing] = useState<IReviewTarget | null>(null);
    const [blocked, setBlocked] = useState<
      (IBlockedAction & { entityName: string }) | null
    >(null);

    const cancelBooking = useCancelBookingMutation(() => setCancelling(null));
    const createPayment = useCreatePaymentMutation();

    // Returns true when the row's status stops the action, after naming the
    // booking in the modal — a bare explanation with no service title on it
    // reads like it is about the whole table.
    const block = (reason: IBlockedAction | null, row: ICustomerBookingRow) => {
      if (!reason) return false;
      setBlocked({ ...reason, entityName: row.serviceTitle });
      return true;
    };

    const [service, ...rest] = bookingBaseColumns<ICustomerBookingRow>();

    return {
      columns: [
        ContactColumn<ICustomerBookingRow>(
          "technician",
          "Technician",
          (row) => ({
            name: row.technicianName,
            email: row.technicianEmail,
            avatar: row.technicianAvatar,
          }),
        ),

        service,

        ...rest,

        ActionColumn<ICustomerBookingRow>(
          [
            {
              icon: CreditCard,
              label: "Pay now",
              variant: "primary",
              disabled: createPayment.isPending,
              onClick: (row) => {
                if (block(payBlockedReason(row.status), row)) return;
                createPayment.mutate(row.id);
              },
            },
            {
              icon: Star,
              label: "Write a review",
              variant: "outline",
              onClick: (row) => {
                if (block(reviewBlockedReason(row.status, row.reviewId), row))
                  return;
                setReviewing({
                  bookingId: row.id,
                  serviceTitle: row.serviceTitle,
                  technicianName: row.technicianName,
                });
              },
            },
            {
              icon: Ban,
              label: "Cancel booking",
              variant: "destructive",
              onClick: (row) => {
                if (block(cancelBlockedReason(row.status), row)) return;
                setCancelling(row);
              },
            },
            {
              icon: Eye,
              label: "View details",
              variant: "noOutline",
              onClick: (row) =>
                router.push(`/dashboard/customer/bookings/${row.id}`),
            },
          ],
          { asDropdown: true, size: 90 },
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

          <ReviewFormPanel
            target={reviewing}
            onClose={() => setReviewing(null)}
          />

          {/* One modal for every action this row's status does not allow. */}
          <ConfirmModal
            isOpen={Boolean(blocked)}
            onClose={() => setBlocked(null)}
            mode="info"
            title={blocked?.title ?? ""}
            description={blocked?.description}
            entityName={blocked?.entityName}
          />
        </>
      ),
    };
  };
