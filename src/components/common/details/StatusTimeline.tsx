import type { ReactNode } from "react";
import { format } from "date-fns";
import { Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";

export interface ITimelineEntry {
  key: string;
  status: ReactNode;
  note?: string | null;
  createdAt: string;
}

interface IStatusTimelineProps {
  entries: ITimelineEntry[];
  emptyMessage?: string;
  className?: string;
}

const StatusTimeline = ({
  entries,
  emptyMessage = "No history yet.",
  className,
}: IStatusTimelineProps) => {
  if (entries.length === 0) {
    return (
      <Text
        variant="normal-sm"
        as="p"
        className="text-project-muted-foreground"
      >
        {emptyMessage}
      </Text>
    );
  }

  return (
    <ol className={cn("relative space-y-6 pl-6", className)}>
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-px bg-project-border"
      />

      {entries.map((entry, index) => (
        <li key={entry.key} className="relative">
          <span
            aria-hidden
            className={cn(
              "absolute -left-5 top-1.5 size-2",
              index === entries.length - 1
                ? "bg-project-primary"
                : "bg-project-muted-foreground",
            )}
          />

          <div className="flex flex-wrap items-center gap-3">
            {entry.status}

            <Text
              variant="normal-xs"
              as="span"
              className="text-project-muted-foreground"
            >
              {format(new Date(entry.createdAt), "MMM d, yyyy • h:mm a")}
            </Text>
          </div>

          {entry.note && (
            <Text
              variant="normal-sm"
              as="p"
              className="mt-2 wrap-break-word text-project-foreground"
            >
              {entry.note}
            </Text>
          )}
        </li>
      ))}
    </ol>
  );
};

export default StatusTimeline;
