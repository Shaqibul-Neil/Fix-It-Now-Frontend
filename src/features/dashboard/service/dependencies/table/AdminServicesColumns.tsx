"use client";

import { useState, type ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { RotateCcw, Trash } from "lucide-react";
import {
  ActionColumn,
  ConfirmModal,
  ContactColumn,
  buildColumn,
} from "@/src/components";
import {
  useDeleteServiceMutation,
  useRestoreServiceMutation,
} from "../hooks/useServiceMutation";
import type { IAdminServiceRow } from "../types/service.types";
import {
  serviceBaseColumns,
  serviceStatusColumn,
  technicianRatingColumn,
} from "./ServiceColumns";

export const useAdminServicesColumns = (): {
  columns: ColumnDef<IAdminServiceRow>[];
  modals: ReactNode;
} => {
  const [deleteTarget, setDeleteTarget] = useState<IAdminServiceRow | null>(
    null,
  );
  const [restoreTarget, setRestoreTarget] = useState<IAdminServiceRow | null>(
    null,
  );

  const deleteService = useDeleteServiceMutation(() => setDeleteTarget(null));
  const restoreService = useRestoreServiceMutation(() =>
    setRestoreTarget(null),
  );

  const [service, ...rest] = serviceBaseColumns<IAdminServiceRow>();

  return {
    columns: [
      service,

      ContactColumn<IAdminServiceRow>("technician", "Technician", (row) => ({
        name: row.technicianName,
        email: row.technicianEmail,
        avatar: row.technicianAvatar,
      })),

      technicianRatingColumn<IAdminServiceRow>(),

      ...buildColumn<IAdminServiceRow>([
        {
          key: "totalBookings",
          label: "Bookings",
          size: 120,
          render: (value: IAdminServiceRow["totalBookings"]) => (
            <span className="font-semibold tabular-nums">{value}</span>
          ),
        },
      ]),

      ...rest,

      serviceStatusColumn<IAdminServiceRow>(),

      ActionColumn<IAdminServiceRow>(
        [
          {
            icon: RotateCcw,
            label: "Restore service",
            variant: "primary",
            hidden: (row) => !row.isDeleted,
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

    modals: (
      <>
        <ConfirmModal
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          mode="cancel"
          title="Remove this service?"
          description="It disappears from every customer list. The technician cannot restore an admin takedown themselves."
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
          description="It goes back on the technician's list and customers can book it again."
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
