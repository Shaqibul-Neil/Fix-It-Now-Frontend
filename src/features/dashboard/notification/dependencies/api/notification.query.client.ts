import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  INotificationList,
  INotificationListQuery,
} from "../types/notification.types";

export const getMyNotifications = ({
  isRead,
  page,
  limit,
}: INotificationListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (isRead !== undefined) params.set("isRead", String(isRead));

  return clientFetch<INotificationList>(
    `${apiEndpoints.notifications.list}?${params.toString()}`,
  );
};
