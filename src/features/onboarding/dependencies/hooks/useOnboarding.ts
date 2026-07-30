"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AppToast } from "@/src/lib/utils/toast.utils";
import {
  createTechnicianProfile,
  updateTechnicianProfile,
} from "../api/onboarding.client";

interface IUseSaveProfileOptions {
  isEditing: boolean;
  onSaved: () => void;
}

export const useSaveTechnicianProfileMutation = ({
  isEditing,
  onSaved,
}: IUseSaveProfileOptions) => {
  const router = useRouter();

  return useMutation({
    mutationFn: isEditing ? updateTechnicianProfile : createTechnicianProfile,

    onSuccess: ({ message }) => {
      onSaved();
      AppToast.success(message ?? "Profile submitted for admin review");
      // A brand new technician has no working hours, and without them nobody
      // can book them — so that page comes before the dashboard, once.
      router.replace(
        isEditing
          ? "/dashboard/technician"
          : "/dashboard/technician/availability",
      );
      router.refresh();
    },
    onError: AppToast.error,
  });
};
