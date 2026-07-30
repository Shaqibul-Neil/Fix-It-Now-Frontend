"use client";

import type { ReactNode } from "react";
import { CopyPlus, Plus, X } from "lucide-react";
import { AppTimePicker, IconButton, Text } from "@/src/components";
import { Switch } from "@/src/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { cn } from "@/src/lib/utils/cn";
import { DAY_LABEL } from "../utils/availability.utils";
import type {
  IDaySchedule,
  ITimeRange,
  TDayOfWeek,
} from "../types/availability.types";

interface IAvailabilityDayRowProps {
  day: TDayOfWeek;
  schedule: IDaySchedule;
  error: string | null;
  onToggle: (isActive: boolean) => void;
  onRangeChange: (index: number, range: ITimeRange) => void;
  onAddRange: () => void;
  onRemoveRange: (index: number) => void;
  onCopyToAll: () => void;
}

// Three icons in a row say nothing on their own, so each names itself.
const HintedButton = ({
  hint,
  onClick,
  children,
}: {
  hint: string;
  onClick: () => void;
  children: ReactNode;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <IconButton
        variant="ghost"
        className="size-8"
        aria-label={hint}
        onClick={onClick}
      >
        {children}
      </IconButton>
    </TooltipTrigger>

    <TooltipContent side="top">{hint}</TooltipContent>
  </Tooltip>
);

const AvailabilityDayRow = ({
  day,
  schedule,
  error,
  onToggle,
  onRangeChange,
  onAddRange,
  onRemoveRange,
  onCopyToAll,
}: IAvailabilityDayRowProps) => {
  const hasRanges = schedule.ranges.length > 0;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-col gap-4 border-b border-project-border py-4 last:border-0 sm:flex-row sm:items-start sm:gap-6">
        {/* Height-matched to a range row so the name sits level with the first
          set of hours instead of floating above it. */}
        <div className="flex w-full shrink-0 items-center gap-3 sm:h-9 sm:w-44">
          <Switch
            checked={schedule.isActive}
            onCheckedChange={onToggle}
            aria-label={`${DAY_LABEL[day]} availability`}
            className="cursor-pointer data-[state=checked]:bg-project-primary"
          />

          <Text
            variant="semibold-base"
            as="span"
            className={cn(
              schedule.isActive
                ? "text-project-accent"
                : "text-project-muted-foreground",
            )}
          >
            {DAY_LABEL[day]}
          </Text>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          {!hasRanges && (
            <Text
              variant="normal-sm"
              as="p"
              className="text-project-muted-foreground"
            >
              Unavailable
            </Text>
          )}

          {schedule.ranges.map((range, index) => (
            <div
              key={index}
              className="flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              {/* The pickers take whatever the row has spare and stop at their
                own minimum, so the page never squeezes them flat. */}
              <AppTimePicker
                value={range.startTime}
                onChange={(startTime) =>
                  onRangeChange(index, { ...range, startTime })
                }
                className="max-w-64 flex-1"
              />

              <Text
                variant="normal-sm"
                as="span"
                className="shrink-0 text-project-muted-foreground"
              >
                to
              </Text>

              <AppTimePicker
                value={range.endTime}
                onChange={(endTime) =>
                  onRangeChange(index, { ...range, endTime })
                }
                className="max-w-64 flex-1"
              />

              <div className="flex shrink-0 items-center gap-1">
                <HintedButton
                  hint="Remove these hours"
                  onClick={() => onRemoveRange(index)}
                >
                  <X size={15} />
                </HintedButton>

                {index === schedule.ranges.length - 1 && (
                  <>
                    <HintedButton
                      hint={`Add a second set of hours on ${DAY_LABEL[day]}`}
                      onClick={onAddRange}
                    >
                      <Plus size={15} />
                    </HintedButton>

                    <HintedButton
                      hint={`Copy ${DAY_LABEL[day]} to every other day`}
                      onClick={onCopyToAll}
                    >
                      <CopyPlus size={15} />
                    </HintedButton>
                  </>
                )}
              </div>
            </div>
          ))}

          {!hasRanges && (
            <IconButton
              variant="outline"
              className="h-9 px-3 text-sm"
              onClick={onAddRange}
            >
              <Plus size={15} />
              Add hours
            </IconButton>
          )}

          {error && <p className="text-xs text-project-destructive">{error}</p>}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AvailabilityDayRow;
