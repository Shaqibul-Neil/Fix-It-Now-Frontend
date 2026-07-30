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
      router.replace("dashboard/technician");
      router.refresh();
    },
    onError: AppToast.error,
  });
};
