"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { notificationKeys } from "../api/notification.key";
import { getMyNotifications } from "../api/notification.query.client";
import type { INotificationListQuery } from "../types/notification.types";

// The bell shows a recent slice, not a page of a table — the whole feed lives
// behind it, so it never asks for more than fits in the dropdown.
const NOTIFICATION_PAGE_SIZE = 15;

// A bell that only refreshes on navigation is a bell nobody trusts.
const POLL_INTERVAL = 60_000;

export const useNotificationsQuery = (isRead?: boolean) => {
  const filter: INotificationListQuery = {
    isRead,
    page: 1,
    limit: NOTIFICATION_PAGE_SIZE,
  };

  return useQuery({
    queryKey: notificationKeys.list(filter),
    queryFn: () => getMyNotifications(filter),
    select: (response) => ({
      items: response.data?.items ?? [],
      unreadCount: response.data?.unreadCount ?? 0,
    }),
    placeholderData: keepPreviousData,
    refetchInterval: POLL_INTERVAL,
  });
};
