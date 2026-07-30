"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, RefreshCw } from "lucide-react";
import { ActionColumn, StatusUpdateModal } from "@/src/components";
import type { TSelectOption } from "@/src/types/filter.types";
import type { TBookingStatus } from "@/src/types/types";
import { useUpdateBookingStatusMutation } from "../hooks/useBookingMutation";
import type {
  ITechnicianBookingRow,
  TBookingStatusUpdate,
} from "../types/booking.types";
import {
  bookingBaseColumns,
  contactColumn,
  type IBookingColumns,
} from "./BookingColumns";

// Only these moves are legal; the backend rejects anything else.
const NEXT_STATUS: Partial<Record<TBookingStatus, TSelectOption[]>> = {
  REQUESTED: [
    {
      label: "Accept the job",
      value: "ACCEPTED" satisfies TBookingStatusUpdate,
    },
    {
      label: "Decline the job",
      value: "DECLINED" satisfies TBookingStatusUpdate,
    },
  ],
  PAID: [
    { label: "Start work", value: "IN_PROGRESS" satisfies TBookingStatusUpdate },
  ],
  IN_PROGRESS: [
    {
      label: "Mark completed",
      value: "COMPLETED" satisfies TBookingStatusUpdate,
    },
  ],
};

export const useTechnicianBookingsColumns =
  (): IBookingColumns<ITechnicianBookingRow> => {
    const router = useRouter();
    const [selected, setSelected] = useState<ITechnicianBookingRow | null>(
      null,
    );
    const updateStatus = useUpdateBookingStatusMutation(() =>
      setSelected(null),
    );

    const [service, ...rest] = bookingBaseColumns<ITechnicianBookingRow>();

    return {
      columns: [
        service,

        contactColumn<ITechnicianBookingRow>("customer", "Customer", (row) => ({
          name: row.customerName,
          email: row.customerEmail,
          phone: row.customerPhone,
        })),

        ...rest,

        ActionColumn<ITechnicianBookingRow>(
          [
            {
              icon: Eye,
              label: "View details",
              variant: "noOutline",
              onClick: (row) =>
                router.push(`/dashboard/technician/jobs/${row.id}`),
            },
            {
              icon: RefreshCw,
              label: "Change status",
              variant: "primary",
              hidden: (row) => !NEXT_STATUS[row.status],
              onClick: setSelected,
            },
          ],
          { size: 110 },
        ),
      ],

      modals: (
        <StatusUpdateModal
          isOpen={Boolean(selected)}
          onClose={() => setSelected(null)}
          title="Update job status"
          description={selected?.serviceTitle}
          options={selected ? (NEXT_STATUS[selected.status] ?? []) : []}
          noteLabel="Note for the customer"
          isPending={updateStatus.isPending}
          onSubmit={(status, note) =>
            selected &&
            updateStatus.mutate({
              id: selected.id,
              payload: { status: status as TBookingStatusUpdate, note },
            })
          }
        />
      ),
    };
  };
