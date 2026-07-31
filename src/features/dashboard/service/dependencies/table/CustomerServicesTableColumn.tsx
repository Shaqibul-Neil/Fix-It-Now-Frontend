"use client";
import { useState, type ReactNode } from "react";
import { CalendarPlus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { ActionColumn, Text } from "@/src/components";
import BookingFormPanel from "@/src/features/dashboard/booking/dependencies/components/BookingFormPanel";
import type { IBookableService, IServiceRow } from "../types/service.types";
import { serviceBaseColumns } from "./ServiceColumns";

export const useCustomerServicesColumns = (): {
  columns: ColumnDef<IServiceRow>[];
  modals: ReactNode;
} => {
  const [selected, setSelected] = useState<IBookableService | null>(null);

  const [service, ...rest] = serviceBaseColumns<IServiceRow>();

  return {
    columns: [
      service,

      {
        id: "technician",
        header: "Technician",
        size: 230,

        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="min-w-0 leading-tight">
              <span className="block truncate font-medium">
                {data.technicianName}
              </span>

              <Text
                variant="normal-xs"
                as="span"
                className="block truncate text-project-muted-foreground"
              >
                {data.technicianEmail}
              </Text>

              <Text
                variant="normal-xs"
                as="span"
                className="block truncate text-project-muted-foreground"
              >
                ★ {data.technicianRating}
              </Text>
            </div>
          );
        },
      },

      ...rest,

      ActionColumn<IServiceRow>(
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
