import { formatDistanceToNow } from "date-fns";
import { cn } from "@/src/lib/utils/cn";
import { Text } from "@/src/components";
import type { INotification } from "./notification.placeholder";
import NotificationTypeIcon from "./NotificationTypeIcon";

interface INotificationItemProps {
  notification: INotification;
  onRead: (id: string) => void;
}

const toRelativeTime = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return formatDistanceToNow(date, { addSuffix: true });
};

const NotificationItem = ({ notification, onRead }: INotificationItemProps) => {
  const { id, type, title, body, isRead, createdAt } = notification;

  return (
    <button
      type="button"
      onClick={() => onRead(id)}
      className={cn(
        "group flex w-full gap-3 border-l-2 p-3 text-left transition-colors duration-300 cursor-pointer",
        isRead
          ? "border-transparent hover:bg-project-muted"
          : "border-project-primary bg-project-muted-primary/40 hover:bg-project-muted-primary/70",
      )}
    >
      <NotificationTypeIcon type={type} isRead={isRead} />

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-start justify-between gap-3">
          <Text
            variant={isRead ? "medium-sm" : "semibold-sm-2"}
            as="span"
            className="text-project-accent"
          >
            {title}
          </Text>

          <Text
            variant="normal-xs"
            as="span"
            className="shrink-0 whitespace-nowrap text-project-muted-foreground"
          >
            {toRelativeTime(createdAt)}
          </Text>
        </span>

        <Text
          variant="normal-sm"
          as="span"
          className="text-project-muted-foreground"
        >
          {body}
        </Text>
      </span>
    </button>
  );
};

export default NotificationItem;
