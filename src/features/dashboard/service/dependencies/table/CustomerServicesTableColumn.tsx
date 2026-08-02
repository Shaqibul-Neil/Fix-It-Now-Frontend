"use client";
import { useState, type ReactNode } from "react";
import { CalendarPlus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { ActionColumn, ContactColumn } from "@/src/components";
import BookingFormPanel from "@/src/features/dashboard/booking/dependencies/components/BookingFormPanel";
import type { IPublicServiceRow } from "@/src/features/public/service/dependencies/types/service.types";
import type { IBookableService } from "../types/service.types";
import {
  serviceAboutColumn,
  serviceBaseColumns,
  technicianRatingColumn,
} from "./ServiceColumns";

export const useCustomerServicesColumns = (): {
  columns: ColumnDef<IPublicServiceRow>[];
  modals: ReactNode;
} => {
  const [selected, setSelected] = useState<IBookableService | null>(null);

  const [service, ...rest] = serviceBaseColumns<IPublicServiceRow>();

  return {
    columns: [
      service,

      ContactColumn<IPublicServiceRow>("technician", "Technician", (row) => ({
        name: row.technicianName,
        email: row.technicianEmail,
        avatar: row.technicianAvatar,
      })),

      technicianRatingColumn<IPublicServiceRow>(),

      ...rest,

      serviceAboutColumn<IPublicServiceRow>(),

      ActionColumn<IPublicServiceRow>(
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
