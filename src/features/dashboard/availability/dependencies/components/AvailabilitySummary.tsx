import { Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";
import { DAY_ORDER, DAY_SHORT, formatRange } from "../utils/availability.utils";
import type { TWeekSchedule } from "../types/availability.types";

// The same line a customer reads on the booking panel, so the technician can
// see exactly what is being advertised before saving.
const AvailabilitySummary = ({
  week,
  className,
}: {
  week: TWeekSchedule;
  className?: string;
}) => {
  const live = DAY_ORDER.filter(
    (day) => week[day].isActive && week[day].ranges.length > 0,
  );

  return (
    <div
      className={cn(
        "border border-project-border bg-project-muted/40 px-4 py-3",
        className,
      )}
    >
      <Text
        variant="medium-xs"
        as="span"
        className="block uppercase tracking-[0.14em] text-project-muted-foreground"
      >
        Customers can book you
      </Text>

      {live.length === 0 ? (
        <Text
          variant="normal-sm"
          as="p"
          className="mt-2 text-project-muted-foreground"
        >
          Never — no day is switched on yet.
        </Text>
      ) : (
        <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
          {live.map((day) => (
            <div key={day} className="flex items-baseline gap-2">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-project-primary">
                {DAY_SHORT[day]}
              </dt>
              <dd className="text-sm font-medium text-project-foreground">
                {week[day].ranges.map(formatRange).join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
};

export default AvailabilitySummary;
