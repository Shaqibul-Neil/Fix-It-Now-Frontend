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

// One flat union for every status the app shows. A new domain status just adds
// a row to STATUS_META — no second type, no union of unions.
export type TStatus =
  // Booking
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  // Payment
  | "PENDING"
  | "PAID"
  | "SUCCESS"
  | "FAILED"
  | "REFUNDED"
  // Technician approval
  | "APPROVED"
  | "REJECTED"
  // Review moderation
  | "PUBLISHED"
  | "HIDDEN"
  // User account
  | "ACTIVE"
  | "BANNED"
  // Soft-deleted row
  | "DELETED"
  | "PAUSED"
  // Spotlight flag
  | "FEATURED";

const STATUS_META: Record<TStatus, { label: string; tone: TTone }> = {
  // Booking
  REQUESTED: { label: "Requested", tone: "neutral" },
  ACCEPTED: { label: "Accepted", tone: "info" },
  DECLINED: { label: "Declined", tone: "danger" },
  IN_PROGRESS: { label: "In progress", tone: "warning" },
  COMPLETED: { label: "Completed", tone: "success" },
  CANCELLED: { label: "Cancelled", tone: "danger" },

  // Payment — PENDING is shared with technician approval, same meaning.
  PENDING: { label: "Pending", tone: "warning" },
  PAID: { label: "Paid", tone: "brass" },
  SUCCESS: { label: "Paid", tone: "success" },
  FAILED: { label: "Failed", tone: "danger" },
  REFUNDED: { label: "Refunded", tone: "info" },

  // Technician approval — brass, not green, so an approved application never
  // reads as the account status sitting beside it. REJECTED is shared with
  // review moderation.
  APPROVED: { label: "Approved", tone: "brass" },
  REJECTED: { label: "Rejected", tone: "danger" },

  // Review moderation — PENDING is shared, same meaning.
  PUBLISHED: { label: "Published", tone: "success" },
  HIDDEN: { label: "Hidden", tone: "neutral" },

  // User account
  ACTIVE: { label: "Active", tone: "success" },
  BANNED: { label: "Banned", tone: "danger" },

  // Soft-deleted row — a listing that is off is paused, the backend's own word.
  DELETED: { label: "Deleted", tone: "danger" },
  PAUSED: { label: "Paused", tone: "warning" },

  // Spotlight flag — brass, the same accent the public badge uses.
  FEATURED: { label: "Featured", tone: "brass" },
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
