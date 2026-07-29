import { cn } from "@/src/lib/utils/cn";

type TTone = "neutral" | "info" | "brass" | "warning" | "success" | "danger";

const TONE_STYLE: Record<TTone, string> = {
  neutral:
    "border-project-border bg-project-muted text-project-muted-foreground",
  info: "border-project-blue/30 bg-project-blue/10 text-project-blue",
  brass:
    "border-project-primary/30 bg-project-muted-primary text-project-primary",
  warning: "border-project-yellow/35 bg-project-yellow/10 text-project-yellow",
  success:
    "border-project-success/30 bg-project-success/10 text-project-success",
  danger:
    "border-project-destructive/30 bg-project-destructive/10 text-project-destructive",
};

const DOT_STYLE: Record<TTone, string> = {
  neutral: "bg-project-muted-foreground",
  info: "bg-project-blue",
  brass: "bg-project-primary",
  warning: "bg-project-yellow",
  success: "bg-project-success",
  danger: "bg-project-destructive",
};

export type TBookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type TPaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export type TStatus = TBookingStatus | TPaymentStatus;

const STATUS_META: Record<TStatus, { label: string; tone: TTone }> = {
  // Booking
  REQUESTED: { label: "Requested", tone: "neutral" },
  ACCEPTED: { label: "Accepted", tone: "info" },
  DECLINED: { label: "Declined", tone: "danger" },
  PAID: { label: "Paid", tone: "brass" },
  IN_PROGRESS: { label: "In progress", tone: "warning" },
  COMPLETED: { label: "Completed", tone: "success" },
  CANCELLED: { label: "Cancelled", tone: "danger" },

  // Payment
  PENDING: { label: "Pending", tone: "warning" },
  SUCCESS: { label: "Paid", tone: "success" },
  FAILED: { label: "Failed", tone: "danger" },
  REFUNDED: { label: "Refunded", tone: "info" },
};

interface IStatusPillProps {
  status: TStatus;
  label?: string;
  className?: string;
}

const StatusPill = ({ status, label, className }: IStatusPillProps) => {
  const { label: defaultLabel, tone } = STATUS_META[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1",
        "text-xs font-medium uppercase tracking-[0.14em] whitespace-nowrap",
        TONE_STYLE[tone],
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 shrink-0", DOT_STYLE[tone])} />
      {label ?? defaultLabel}
    </span>
  );
};

export default StatusPill;
