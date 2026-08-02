"use client";

import { useState, type ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, RotateCcw, Trash } from "lucide-react";
import { ActionColumn, ConfirmModal } from "@/src/components";
import ServiceFormPanel from "../components/ServiceFormPanel";
import {
  useDeleteServiceMutation,
  useRestoreServiceMutation,
} from "../hooks/useServiceMutation";
import type {
  IManagedServiceRow,
  IServiceFormTarget,
} from "../types/service.types";
import {
  serviceAboutColumn,
  serviceBaseColumns,
  serviceStatusColumn,
} from "./ServiceColumns";

export const useTechnicianServicesColumns = (): {
  columns: ColumnDef<IManagedServiceRow>[];
  modals: ReactNode;
  openCreate: () => void;
} => {
  const [formTarget, setFormTarget] = useState<IServiceFormTarget | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IManagedServiceRow | null>(
    null,
  );
  const [restoreTarget, setRestoreTarget] = useState<IManagedServiceRow | null>(
    null,
  );

  const deleteService = useDeleteServiceMutation(() => setDeleteTarget(null));
  const restoreService = useRestoreServiceMutation(() =>
    setRestoreTarget(null),
  );

  return {
    columns: [
      ...serviceBaseColumns<IManagedServiceRow>(),

      serviceAboutColumn<IManagedServiceRow>(),

      serviceStatusColumn<IManagedServiceRow>(),

      ActionColumn<IManagedServiceRow>(
        [
          {
            icon: Pencil,
            label: "Update service",
            variant: "noOutline",
            hidden: (row) => row.isDeleted,
            onClick: (row) => setFormTarget(row),
          },
          {
            // An admin takedown answers 403 here, so the owner is not offered it.
            icon: RotateCcw,
            label: "Restore service",
            variant: "primary",
            hidden: (row) => !row.isDeleted || row.removedBy?.role === "ADMIN",
            onClick: (row) => setRestoreTarget(row),
          },
          {
            icon: Trash,
            label: "Remove service",
            variant: "destructive",
            hidden: (row) => row.isDeleted,
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
        <ServiceFormPanel
          target={formTarget}
          onClose={() => setFormTarget(null)}
        />

        <ConfirmModal
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          mode="cancel"
          title="Remove this service?"
          description="Customers stop seeing it right away. Bookings already placed stay open, and you can restore the listing later."
          entityName={deleteTarget?.title}
          confirmText="Yes, remove it"
          isPending={deleteService.isPending}
          onConfirm={() =>
            deleteTarget && deleteService.mutate(deleteTarget.id)
          }
        />

        <ConfirmModal
          isOpen={Boolean(restoreTarget)}
          onClose={() => setRestoreTarget(null)}
          mode="approve"
          title="Restore this service?"
          description="It goes back on your list and customers can book it again."
          entityName={restoreTarget?.title}
          confirmText="Yes, restore it"
          isPending={restoreService.isPending}
          onConfirm={() =>
            restoreTarget && restoreService.mutate(restoreTarget.id)
          }
        />
      </>
    ),
  };
};
