"use client";

import { Bell, CheckCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils/cn";
import { NotificationSkeleton, Text } from "@/src/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/src/features/dashboard/notification/dependencies/hooks/useNotificationMutation";
import { useNotificationsQuery } from "@/src/features/dashboard/notification/dependencies/hooks/useNotificationQuery";
import NotificationEmpty from "./NotificationEmpty";
import NotificationItem from "./NotificationItem";

type TTab = "all" | "unread";

const NotificationBell = () => {
  const [tab, setTab] = useState<TTab>("all");

  // The unread tab is a server filter, not a slice of the page already loaded —
  // otherwise it would only ever show the unread rows inside the last fifteen.
  const { data, isPending } = useNotificationsQuery(
    tab === "unread" ? false : undefined,
  );

  const markRead = useMarkNotificationReadMutation();
  const markAllRead = useMarkAllNotificationsReadMutation();

  const notifications = data?.items ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const renderBody = () => {
    if (isPending) return <NotificationSkeleton />;
    if (!notifications.length) return <NotificationEmpty />;

    return notifications.map((notification) => (
      <NotificationItem
        key={notification.id}
        notification={notification}
        onRead={(id) => !notification.isRead && markRead.mutate(id)}
      />
    ));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-9 items-center justify-center border border-project-border bg-project-card text-project-muted-foreground transition-colors duration-300 hover:border-project-primary/40 hover:text-project-primary cursor-pointer"
        >
          <Bell className="size-4" />

          {unreadCount > 0 && (
            <span className="absolute -right-px -top-px flex min-w-4 items-center justify-center bg-project-primary px-1 text-[10px] font-bold leading-4 text-project-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-92 max-w-[calc(100vw-2rem)] overflow-hidden p-0"
      >
        <div className="flex items-center justify-between gap-3 border-b border-project-border px-4 py-3">
          <Text
            variant="medium-xs"
            as="span"
            className="uppercase tracking-[0.28em] text-project-primary"
          >
            Notifications
          </Text>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-project-muted-foreground transition-colors duration-300 hover:text-project-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </button>
          )}
        </div>

        <div className="flex border-b border-project-border">
          {(["all", "unread"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={cn(
                "relative flex-1 py-2.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 cursor-pointer",
                tab === value
                  ? "text-project-primary"
                  : "text-project-muted-foreground hover:text-project-accent",
              )}
            >
              {value === "all" ? "All" : `Unread (${unreadCount})`}

              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-project-primary transition-transform duration-300",
                  tab === value ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>

        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {renderBody()}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
