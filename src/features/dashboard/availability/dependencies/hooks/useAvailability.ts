"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppToast } from "@/src/lib/utils/toast.utils";
import { availabilityKeys } from "../api/availability.key";
import {
  getMyAvailability,
  getTechnicianAvailability,
  setMyAvailability,
} from "../api/availability.client";

//-----------------Technician---------------
export const useMyAvailabilityQuery = () =>
  useQuery({
    queryKey: availabilityKeys.mine,
    queryFn: getMyAvailability,
    select: (response) => response.data ?? [],
  });

export const useSetAvailabilityMutation = (onDone?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setMyAvailability,

    onSuccess: async ({ message }) => {
      await queryClient.invalidateQueries({ queryKey: availabilityKeys.mine });
      // Every customer-facing copy of this technician's hours is now stale.
      await queryClient.invalidateQueries({
        queryKey: ["technician-availability"],
      });
      AppToast.success(message ?? "Working hours updated");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

//-----------------Public---------------
export const useTechnicianAvailabilityQuery = (
  technicianId: string | undefined,
) =>
  useQuery({
    queryKey: availabilityKeys.technician(technicianId ?? ""),
    queryFn: () => getTechnicianAvailability(technicianId as string),
    select: (response) => response.data ?? [],
    enabled: Boolean(technicianId),
    // Hours change rarely, and the panel opens once per service row.
    staleTime: 5 * 60 * 1000,
  });
