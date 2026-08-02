import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";

// Both endpoints answer with how many rows they touched.
export const markNotificationRead = (id: string) =>
  clientFetch<{ updated: number }>(apiEndpoints.notifications.read(id), {
    method: "PATCH",
  });

export const markAllNotificationsRead = () =>
  clientFetch<{ updated: number }>(apiEndpoints.notifications.readAll, {
    method: "PATCH",
  });
