"use client";

import { useState, type ReactNode } from "react";
import { Ban, RotateCcw, ShieldCheck, Trash } from "lucide-react";
import { ConfirmModal, type TTableAction } from "@/src/components";
import type { TUserStatus } from "@/src/types/types";
import {
  useDeleteUserMutation,
  useRestoreUserMutation,
  useUpdateUserStatusMutation,
} from "../hooks/useUserMutation";

export interface IAccountState {
  userId: string;
  name: string;
  status: TUserStatus;
  isDeleted: boolean;
}

// Ban, remove and restore all hit the account, so the technician table and the
// user table share one set of actions instead of writing it twice. `entity` is
// only the wording — "Ban technician" reads better on a technician row.
export const useAccountActions = <TRow,>(
  read: (row: TRow) => IAccountState,
  entity = "account",
): { actions: TTableAction<TRow>[]; modals: ReactNode } => {
  const [statusTarget, setStatusTarget] = useState<IAccountState | null>(null);
  const [removeTarget, setRemoveTarget] = useState<IAccountState | null>(null);
  const [restoreTarget, setRestoreTarget] = useState<IAccountState | null>(
    null,
  );

  const updateStatus = useUpdateUserStatusMutation(() => setStatusTarget(null));
  const removeAccount = useDeleteUserMutation(() => setRemoveTarget(null));
  const restoreAccount = useRestoreUserMutation(() => setRestoreTarget(null));

  const isBanning = statusTarget?.status === "ACTIVE";

  return {
    actions: [
      {
        icon: Ban,
        label: `Ban ${entity}`,
        variant: "destructive",
        hidden: (row) => {
          const account = read(row);
          return account.isDeleted || account.status !== "ACTIVE";
        },
        onClick: (row) => setStatusTarget(read(row)),
      },
      {
        icon: ShieldCheck,
        label: `Reinstate ${entity}`,
        variant: "primary",
        hidden: (row) => {
          const account = read(row);
          return account.isDeleted || account.status !== "BANNED";
        },
        onClick: (row) => setStatusTarget(read(row)),
      },
      {
        icon: Trash,
        label: `Remove ${entity}`,
        variant: "destructive",
        hidden: (row) => read(row).isDeleted,
        onClick: (row) => setRemoveTarget(read(row)),
      },
      {
        icon: RotateCcw,
        label: `Restore ${entity}`,
        variant: "primary",
        hidden: (row) => !read(row).isDeleted,
        onClick: (row) => setRestoreTarget(read(row)),
      },
    ],

    modals: (
      <>
        <ConfirmModal
          isOpen={Boolean(statusTarget)}
          onClose={() => setStatusTarget(null)}
          mode={isBanning ? "reject" : "approve"}
          title={isBanning ? `Ban this ${entity}?` : `Lift the ban?`}
          description={
            isBanning
              ? "They are signed out and cannot take part until the ban is lifted. Work already booked stays where it is."
              : "They can sign in and take part again straight away."
          }
          entityName={statusTarget?.name}
          confirmText={isBanning ? "Yes, ban them" : "Yes, reinstate them"}
          isPending={updateStatus.isPending}
          onConfirm={() =>
            statusTarget &&
            updateStatus.mutate({
              id: statusTarget.userId,
              payload: { status: isBanning ? "BANNED" : "ACTIVE" },
            })
          }
        />

        <ConfirmModal
          isOpen={Boolean(removeTarget)}
          onClose={() => setRemoveTarget(null)}
          mode="cancel"
          title={`Remove this ${entity}?`}
          description="The account is taken off the platform. It can be restored later, and it comes back exactly as it was left."
          entityName={removeTarget?.name}
          confirmText="Yes, remove it"
          isPending={removeAccount.isPending}
          onConfirm={() =>
            removeTarget && removeAccount.mutate(removeTarget.userId)
          }
        />

        <ConfirmModal
          isOpen={Boolean(restoreTarget)}
          onClose={() => setRestoreTarget(null)}
          mode="approve"
          title={`Restore this ${entity}?`}
          // The backend restores the row untouched — a ban taken before the
          // removal is still standing afterwards, and lifting it is its own act.
          description="A ban taken before the removal stays in place. Lift it separately if they should be able to sign in."
          entityName={restoreTarget?.name}
          confirmText="Yes, restore it"
          isPending={restoreAccount.isPending}
          onConfirm={() =>
            restoreTarget && restoreAccount.mutate(restoreTarget.userId)
          }
        />
      </>
    ),
  };
};
