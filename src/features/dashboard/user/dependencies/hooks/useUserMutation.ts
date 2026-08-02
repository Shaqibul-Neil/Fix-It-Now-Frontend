"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { technicianKeys } from "@/src/features/dashboard/technician/dependencies/api/technician.key";
import { AppToast } from "@/src/lib/utils/toast.utils";
import { userKeys } from "../api/user.key";
import {
  deleteUser,
  restoreUser,
  updateUserStatus,
} from "../api/user.mutation.client";
import type { IUpdateUserStatusPayload } from "../types/user.types";

// An account action is taken from the user table and from the technician table
// alike, and both lists carry the account state — so both go.
const useInvalidateAccount = () => {
  const queryClient = useQueryClient();

  return () =>
    Promise.all(
      [
        userKeys.admin.lists,
        technicianKeys.admin.lists,
        ["admin-technician"],
      ].map((queryKey) => queryClient.invalidateQueries({ queryKey })),
    );
};

//-----------------Admin---------------
export const useUpdateUserStatusMutation = (onDone?: () => void) => {
  const invalidateAccount = useInvalidateAccount();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateUserStatusPayload;
    }) => updateUserStatus(id, payload),

    onSuccess: async ({ message }) => {
      await invalidateAccount();
      AppToast.success(message ?? "Account updated");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

export const useDeleteUserMutation = (onDone?: () => void) => {
  const invalidateAccount = useInvalidateAccount();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: async ({ message }) => {
      await invalidateAccount();
      AppToast.success(message ?? "Account removed");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

export const useRestoreUserMutation = (onDone?: () => void) => {
  const invalidateAccount = useInvalidateAccount();

  return useMutation({
    mutationFn: restoreUser,

    onSuccess: async ({ message }) => {
      await invalidateAccount();
      AppToast.success(message ?? "Account reinstated");
      onDone?.();
    },
    onError: AppToast.error,
  });
};
