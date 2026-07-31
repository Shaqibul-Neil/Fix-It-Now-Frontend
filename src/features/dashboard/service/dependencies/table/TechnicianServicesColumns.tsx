"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { ActionColumn } from "@/src/components";
import type { IBaseServiceRow } from "../types/service.types";
import { serviceBaseColumns } from "./ServiceColumns";

export const useTechnicianServicesColumns = (): {
  columns: ColumnDef<IBaseServiceRow>[];
  modals: null;
} => {
  const columns = serviceBaseColumns<IBaseServiceRow>();

  return {
    columns: [
      ...columns,

      ActionColumn<IBaseServiceRow>(
        [
          {
            icon: Pencil,
            label: "Update Service",
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
