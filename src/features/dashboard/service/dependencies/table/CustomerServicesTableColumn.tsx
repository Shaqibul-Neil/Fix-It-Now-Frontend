"use client";

import { useState, type ReactNode } from "react";
import { CalendarPlus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { ActionColumn, Text, buildColumn } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import BookingFormPanel from "@/src/features/dashboard/booking/dependencies/components/BookingFormPanel";
import type { IBookableService, IServiceRow } from "../types/service.types";

export const useCustomerServicesColumns = (): {
  columns: ColumnDef<IServiceRow>[];
  modals: ReactNode;
} => {
  const [selected, setSelected] = useState<IBookableService | null>(null);

  return {
    columns: [
      ...buildColumn<IServiceRow>([
        {
          id: "service",
          label: "Service",
          size: 280,
          render: (row: IServiceRow) => (
            <div className="min-w-0 leading-tight">
              <span className="block truncate font-medium">{row.title}</span>
              <Text
                variant="normal-xs"
                as="span"
                className="block truncate text-project-muted-foreground"
              >
                {row.category}
              </Text>
            </div>
          ),
        },
        {
          id: "technician",
          label: "Technician",
          size: 230,
          render: (row: IServiceRow) => (
            <div className="min-w-0 leading-tight">
              <span className="block truncate font-medium">
                {row.technicianName}
              </span>
              <Text
                variant="normal-xs"
                as="span"
                className="block truncate text-project-muted-foreground"
              >
                {row.technicianEmail}
              </Text>
              <Text
                variant="normal-xs"
                as="span"
                className="block truncate text-project-muted-foreground"
              >
                ★ {row.technicianRating}
              </Text>
            </div>
          ),
        },
        {
          id: "price",
          label: "Price",
          size: 110,
          render: (row: IServiceRow) => (
            <span className="font-semibold tabular-nums">
              {formatMoney(row.price)}
            </span>
          ),
        },
        {
          id: "estimatedDuration",
          label: "Duration",
          size: 110,
          render: (row: IServiceRow) => (
            <span className="whitespace-nowrap">
              {row.estimatedDuration ? `${row.estimatedDuration} min` : "—"}
            </span>
          ),
        },
        {
          id: "description",
          label: "About",
          size: 320,
          render: (row: IServiceRow) => (
            <span className="line-clamp-2 text-project-muted-foreground">
              {row.description ?? "—"}
            </span>
          ),
        },
      ]),

      ActionColumn<IServiceRow>(
        [
          {
            icon: CalendarPlus,
            label: "Book now",
            variant: "primary",
            onClick: ({ id, title, price }) => setSelected({ id, title, price }),
          },
        ],
        { size: 100 },
      ),
    ],

    modals: (
      <BookingFormPanel service={selected} onClose={() => setSelected(null)} />
    ),
  };
};
