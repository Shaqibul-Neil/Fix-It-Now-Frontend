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
import NotificationEmpty from "./NotificationEmpty";
import NotificationItem from "./NotificationItem";
import {
  PLACEHOLDER_NOTIFICATIONS,
  type INotification,
} from "./notification.placeholder";

type TTab = "all" | "unread";

interface INotificationBellProps {
  notifications?: INotification[];
  isLoading?: boolean;
}

const NotificationBell = ({
  notifications = PLACEHOLDER_NOTIFICATIONS,
  isLoading = false,
}: INotificationBellProps) => {
  const [tab, setTab] = useState<TTab>("all");

  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const visible =
    tab === "unread"
      ? notifications.filter((item) => !item.isRead)
      : notifications;

  const handleRead = (id: string) => console.log("mark as read", id);
  const handleReadAll = () => console.log("mark all as read");

  const renderBody = () => {
    if (isLoading) return <NotificationSkeleton />;
    if (!visible.length) return <NotificationEmpty />;

    return visible.map((notification) => (
      <NotificationItem
        key={notification.id}
        notification={notification}
        onRead={handleRead}
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
              onClick={handleReadAll}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-project-muted-foreground transition-colors duration-300 hover:text-project-primary cursor-pointer"
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
