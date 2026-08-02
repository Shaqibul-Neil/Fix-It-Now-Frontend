"use client";

import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { ActionColumn, ContactColumn } from "@/src/components";
import type { TAdminBookingRow } from "../types/booking.types";
import { bookingBaseColumns, type IBookingColumns } from "./BookingColumns";

export const useAdminBookingsColumns =
  (): IBookingColumns<TAdminBookingRow> => {
    const router = useRouter();

    // Both parties lead, then the service they met over, then the shared rest.
    const [service, ...rest] = bookingBaseColumns<TAdminBookingRow>();

    return {
      columns: [
        ContactColumn<TAdminBookingRow>("customer", "Customer", (row) => ({
          name: row.customerName,
          email: row.customerEmail,
          avatar: row.customerAvatar,
        })),

        ContactColumn<TAdminBookingRow>("technician", "Technician", (row) => ({
          name: row.technicianName,
          email: row.technicianEmail,
          avatar: row.technicianAvatar,
        })),

        service,

        ...rest,

        ActionColumn<TAdminBookingRow>(
          [
            {
              icon: Eye,
              label: "View details",
              variant: "noOutline",
              onClick: (row) =>
                router.push(`/dashboard/admin/bookings/${row.id}`),
            },
          ],
          { asDropdown: true, size: 90 },
        ),
      ],
      modals: null,
    };
  };
