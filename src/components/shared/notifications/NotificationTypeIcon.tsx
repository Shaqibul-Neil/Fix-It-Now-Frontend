import {
  CalendarCheck,
  ShieldCheck,
  Star,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/src/lib/utils/cn";
import type { TNotificationType } from "@/src/features/dashboard/notification/dependencies/types/notification.types";

// Twenty-odd notification types, five icons — the prefix is the family a reader
// recognises, so the icon follows that rather than the exact event.
const PREFIX_ICON: [string, LucideIcon][] = [
  ["BOOKING_", CalendarCheck],
  ["PAYMENT_", Wallet],
  ["REVIEW_", Star],
  ["SERVICE_", Wrench],
  ["CATEGORY_", Wrench],
];

const NotificationTypeIcon = ({
  type,
  isRead,
}: {
  type: TNotificationType;
  isRead: boolean;
}) => {
  // Everything left — account, technician and registration events — is the
  // platform talking about the account itself.
  const Icon =
    PREFIX_ICON.find(([prefix]) => type.startsWith(prefix))?.[1] ?? ShieldCheck;

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
