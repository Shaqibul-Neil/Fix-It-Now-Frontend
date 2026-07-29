"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginClient, logoutClient, registerClient } from "../api/auth.client";
import { AppToast } from "@/src/lib/utils/toast.utils";
import { ROLE_LANDING_PAGE } from "@/src/lib/auth/auth.roles";

const readRedirectTo = () =>
  new URLSearchParams(window.location.search).get("redirectTo");

//---------------Login----------------
export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginClient,
    onSuccess: ({ message, data }) => {
      if (!data) return;
      AppToast.success(message ?? "Signed in successfully");

      router.replace(readRedirectTo() ?? ROLE_LANDING_PAGE[data.role]);
      router.refresh();
    },

    onError: AppToast.error,
  });
};

//---------------Register----------------
export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerClient,
    onSuccess: ({ message, data }) => {
      if (!data) return;
      AppToast.success(message ?? "Account created successfully");

      router.replace("/login");
      router.refresh();
    },
    onError: AppToast.error,
  });
};

//---------------Logout---------------
export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logoutClient,
    onSuccess: ({ message }) => {
      AppToast.success(message ?? "Signed out successfully");
      router.replace("/login");
      router.refresh();
    },
    onError: AppToast.error,
  });
};
