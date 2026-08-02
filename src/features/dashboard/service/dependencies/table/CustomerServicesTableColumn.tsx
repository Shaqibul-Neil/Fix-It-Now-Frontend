"use client";
import { useState, type ReactNode } from "react";
import { CalendarPlus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { ActionColumn, ContactColumn } from "@/src/components";
import BookingFormPanel from "@/src/features/dashboard/booking/dependencies/components/BookingFormPanel";
import type {
  IBookableService,
  ICustomerServiceRow,
} from "../types/service.types";
import {
  serviceAboutColumn,
  serviceBaseColumns,
  technicianRatingColumn,
} from "./ServiceColumns";

export const useCustomerServicesColumns = (): {
  columns: ColumnDef<ICustomerServiceRow>[];
  modals: ReactNode;
} => {
  const [selected, setSelected] = useState<IBookableService | null>(null);

  const [service, ...rest] = serviceBaseColumns<ICustomerServiceRow>();

  return {
    columns: [
      service,

      ContactColumn<ICustomerServiceRow>("technician", "Technician", (row) => ({
        name: row.technicianName,
        email: row.technicianEmail,
        avatar: row.technicianAvatar,
      })),

      technicianRatingColumn<ICustomerServiceRow>(),

      ...rest,

      serviceAboutColumn<ICustomerServiceRow>(),

      ActionColumn<ICustomerServiceRow>(
        [
          {
            icon: CalendarPlus,
            label: "Book now",
            variant: "primary",

            onClick: (row) =>
              setSelected({
                id: row.id,
                title: row.title,
                price: row.price,
                technicianId: row.technicianId,
                technicianName: row.technicianName,
                estimatedDuration: row.estimatedDuration,
              }),
          },
        ],
        {
          asDropdown: true,
          size: 90,
        },
      ),
    ],

    modals: (
      <BookingFormPanel service={selected} onClose={() => setSelected(null)} />
    ),
  };
};
