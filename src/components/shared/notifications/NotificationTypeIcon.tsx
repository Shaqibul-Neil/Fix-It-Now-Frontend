import { CalendarCheck, ShieldCheck, Star, Wallet } from "lucide-react";
import type { ElementType } from "react";
import { cn } from "@/src/lib/utils/cn";
import type { TNotificationType } from "./notification.placeholder";

const TYPE_ICON: Record<TNotificationType, ElementType> = {
  booking: CalendarCheck,
  payment: Wallet,
  review: Star,
  system: ShieldCheck,
};

const NotificationTypeIcon = ({
  type,
  isRead,
}: {
  type: TNotificationType;
  isRead: boolean;
}) => {
  const Icon = TYPE_ICON[type];

  return (
    <span
      aria-hidden
      className={cn(
        "flex size-9 shrink-0 items-center justify-center border transition-colors duration-300",
        isRead
          ? "border-project-border text-project-muted-foreground"
          : "border-project-primary/40 bg-project-muted-primary text-project-primary",
      )}
    >
      <Icon className="size-4" />
    </span>
  );
};

export default NotificationTypeIcon;
