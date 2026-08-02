"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppToast } from "@/src/lib/utils/toast.utils";
import { serviceKeys } from "../api/service.key";
import {
  createService,
  deleteService,
  restoreService,
  updateService,
} from "../api/service.mutation.client";
import type {
  ICreateServicePayload,
  IUpdateServicePayload,
} from "../types/service.types";

// A service shows up on the technician's own list, the admin list, and the
// customer's public browse list at once, so every write drops all three.
const useInvalidateService = () => {
  const queryClient = useQueryClient();

  return () =>
    Promise.all(
      [
        serviceKeys.technician.lists,
        serviceKeys.admin.lists,
        serviceKeys.customer.lists,
      ].map((queryKey) => queryClient.invalidateQueries({ queryKey })),
    );
};

//-----------------Technician---------------
export const useCreateServiceMutation = (onDone?: () => void) => {
  const invalidateService = useInvalidateService();

  return useMutation({
    mutationFn: (payload: ICreateServicePayload) => createService(payload),

    onSuccess: async ({ message }) => {
      await invalidateService();
      AppToast.success(message ?? "Service created");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

export const useUpdateServiceMutation = (onDone?: () => void) => {
  const invalidateService = useInvalidateService();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateServicePayload;
    }) => updateService(id, payload),

    onSuccess: async ({ message }) => {
      await invalidateService();
      AppToast.success(message ?? "Service updated");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

//-----------------Technician (own) + Admin (any)---------------
export const useDeleteServiceMutation = (onDone?: () => void) => {
  const invalidateService = useInvalidateService();

  return useMutation({
    mutationFn: deleteService,

    onSuccess: async ({ message }) => {
      await invalidateService();
      AppToast.success(message ?? "Service removed");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

export const useRestoreServiceMutation = (onDone?: () => void) => {
  const invalidateService = useInvalidateService();

  return useMutation({
    mutationFn: restoreService,

    onSuccess: async ({ message }) => {
      await invalidateService();
      AppToast.success(message ?? "Service restored");
      onDone?.();
    },
    onError: AppToast.error,
  });
};
