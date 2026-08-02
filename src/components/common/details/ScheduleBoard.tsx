import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

export interface IScheduleDay {
  id: string;
  label: string;
  // Already formatted for reading — "9:00 AM – 5:00 PM".
  ranges: string[];
}

interface IScheduleBoardProps {
  days: IScheduleDay[];
  closedLabel?: string;
  className?: string;
}

// A week at a glance: one card per day, stacked down its column, so a gap in
// the schedule is visible as a gap rather than read off a list of the days that
// survived.
const ScheduleBoard = ({
  days,
  closedLabel = "Closed",
  className,
}: IScheduleBoardProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {days.map((day) => {
        const isOpen = day.ranges.length > 0;

        return (
          <div
            key={day.id}
            className={cn(
              "flex flex-col gap-2 border p-3",
              isOpen
                ? "border-project-primary/40 bg-project-muted-primary"
                : "border-project-border bg-project-muted/30",
            )}
          >
            <Text
              variant="medium-xs"
              as="span"
              className={cn(
                "uppercase tracking-[0.16em]",
                isOpen
                  ? "text-project-primary"
                  : "text-project-muted-foreground",
              )}
            >
              {day.label}
            </Text>

            {isOpen ? (
              <div className="space-y-1">
                {day.ranges.map((range) => (
                  <span
                    key={range}
                    className="block text-xs font-medium text-project-foreground"
                  >
                    {range}
                  </span>
                ))}
              </div>
            ) : (
              <Text
                variant="normal-xs"
                as="span"
                className="text-project-muted-foreground"
              >
                {closedLabel}
              </Text>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleBoard;
