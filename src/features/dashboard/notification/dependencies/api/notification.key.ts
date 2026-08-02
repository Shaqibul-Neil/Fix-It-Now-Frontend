import type { INotificationListQuery } from "../types/notification.types";

// `lists` is the prefix a mutation invalidates, `list` is the exact query.
export const notificationKeys = {
  lists: ["notifications"] as const,
  list: (query: INotificationListQuery) => ["notifications", query] as const,
};
