"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppToast } from "@/src/lib/utils/toast.utils";
import { notificationKeys } from "../api/notification.key";
import {
  markAllNotificationsRead,
  markNotificationRead,
} from "../api/notification.mutation.client";

// Reading one row changes the unread count every tab of the bell shows, so both
// mutations drop the whole prefix.
const useInvalidateNotifications = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: notificationKeys.lists });
};

// Opening a notification is not an act worth a toast — only the failure is.
export const useMarkNotificationReadMutation = () => {
  const invalidateNotifications = useInvalidateNotifications();

  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: invalidateNotifications,
    onError: AppToast.error,
  });
};

export const useMarkAllNotificationsReadMutation = () => {
  const invalidateNotifications = useInvalidateNotifications();

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: async ({ message }) => {
      await invalidateNotifications();
      AppToast.success(message ?? "All notifications marked as read");
    },
    onError: AppToast.error,
  });
};
