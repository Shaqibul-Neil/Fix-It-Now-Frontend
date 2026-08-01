"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppToast } from "@/src/lib/utils/toast.utils";
import { technicianKeys } from "../api/technician.key";
import { reviewTechnician } from "../api/technician.mutation.client";
import type { IReviewTechnicianPayload } from "../types/technician.types";

//-----------------Admin---------------
// A decision moves the row between approval tabs and rewrites the profile the
// details page shows, so both caches go.
export const useReviewTechnicianMutation = (onDone?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IReviewTechnicianPayload;
    }) => reviewTechnician(id, payload),

    onSuccess: async ({ message }, { id }) => {
      await Promise.all(
        [technicianKeys.admin.lists, technicianKeys.admin.details(id)].map(
          (queryKey) => queryClient.invalidateQueries({ queryKey }),
        ),
      );
      AppToast.success(message ?? "Technician application reviewed");
      onDone?.();
    },
    onError: AppToast.error,
  });
};
