"use client";

import { useState, type ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { ActionColumn, ConfirmModal } from "@/src/components";
import ServiceFormPanel from "../components/ServiceFormPanel";
import { useDeleteServiceMutation } from "../hooks/useServiceMutation";
import type { IBaseServiceRow, IServiceFormTarget } from "../types/service.types";
import { serviceBaseColumns } from "./ServiceColumns";

export const useTechnicianServicesColumns = (): {
  columns: ColumnDef<IBaseServiceRow>[];
  modals: ReactNode;
  openCreate: () => void;
} => {
  const [formTarget, setFormTarget] = useState<IServiceFormTarget | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<IBaseServiceRow | null>(
    null,
  );

  const deleteService = useDeleteServiceMutation(() => setDeleteTarget(null));

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
            onClick: (row) => setFormTarget(row),
          },
          {
            icon: Trash,
            label: "Delete Service",
            variant: "destructive",
            onClick: (row) => setDeleteTarget(row),
          },
        ],
        {
          asDropdown: true,
          size: 90,
        },
      ),
    ],

    openCreate: () => setFormTarget({}),

    modals: (
      <>
        <ServiceFormPanel target={formTarget} onClose={() => setFormTarget(null)} />

        <ConfirmModal
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          mode="cancel"
          title="Delete this service?"
          description="This cannot be undone. Services with existing bookings cannot be deleted."
          entityName={deleteTarget?.title}
          confirmText="Yes, delete it"
          isPending={deleteService.isPending}
          onConfirm={() =>
            deleteTarget && deleteService.mutate(deleteTarget.id)
          }
        />
      </>
    ),
  };
};
