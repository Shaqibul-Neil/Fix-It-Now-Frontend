"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import { ActionColumn, StatusPill, Text } from "@/src/components";
import type { IAdminService } from "../types/service.types";
import { serviceBaseColumns } from "./ServiceColumns";

export const useAdminServicesColumns = (): {
  columns: ColumnDef<IAdminService>[];
  modals: null;
} => {
  const [service, ...rest] = serviceBaseColumns<IAdminService>();

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

      {
        id: "totalBookings",
        header: "Bookings",
        size: 120,

        cell: ({ row }) => (
          <span className="font-semibold tabular-nums">
            {row.original.totalBookings}
          </span>
        ),
      },

      ...rest,
      {
        id: "status",
        header: "Status",
        size: 150,
        cell: ({ row }) => (
          <StatusPill status={row.original.isActive ? "ACTIVE" : "INACTIVE"} />
        ),
      },

      ActionColumn<IAdminService>(
        [
          {
            icon: Eye,
            label: "View details",
            variant: "noOutline",

            onClick: (row) => {
              console.log(row.id);
            },
          },
          {
            icon: Trash,
            label: "Delete Service",
            variant: "destructive",
            onClick: (row) => {
              console.log(row.id);
            },
          },
        ],
        {
          asDropdown: true,
          size: 90,
        },
      ),
    ],

    modals: null,
  };
};
