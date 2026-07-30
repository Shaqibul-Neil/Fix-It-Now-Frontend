"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  differenceInDays,
  format,
  startOfToday,
  subDays,
  subMonths,
} from "date-fns";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

interface TAppDatePickerProps {
  mode?: "single" | "range";
  label?: string;
  error?: string;
  minDays?: number;
  maxDays?: number;
  disableFuture?: boolean;
  disablePast?: boolean;
  value?: Date;
  initialRange?: DateRange;
  onDateChange?: (date: Date | undefined) => void;
  onRangeChange?: (range: DateRange | undefined) => void;
  className?: string;
  containerClassName?: string;
  placeholderText?: string;
  variant?: "default" | "compact";
}

const AppDatePicker = ({
  mode = "range",
  label,
  error,
  minDays,
  maxDays = 365,
  disableFuture = false,
  disablePast = false,
  value,
  initialRange,
  onDateChange,
  onRangeChange,
  className,
  containerClassName,
  placeholderText = "Filter by Date",
  variant = "default",
}: TAppDatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(value);
  const [range, setRange] = useState<DateRange | undefined>(initialRange);

  const [lastValue, setLastValue] = useState(value);
  if (value !== lastValue) {
    setLastValue(value);
    setDate(value);
  }

  const [lastInitialRange, setLastInitialRange] = useState(initialRange);
  if (initialRange !== lastInitialRange) {
    setLastInitialRange(initialRange);
    setRange(initialRange);
  }

  const handleSingleSelect = (val: Date | undefined) => {
    setDate(val);
    onDateChange?.(val);
  };

  const handleRangeSelect = (val: DateRange | undefined) => {
    if (!val?.from || !val?.to) {
      setRange(val);
      return;
    }

    const from = val.from;
    const to = val.to;
    const daysDiff = Math.abs(differenceInDays(to, from)) + 1;

    if (minDays && daysDiff < minDays) return;

    let newRange: DateRange = val;
    if (maxDays && daysDiff > maxDays) {
      newRange = {
        from: subDays(to, maxDays - 1),
        to,
      };
    }

    setRange(newRange);
    onRangeChange?.(newRange);
  };

  const getDisplayText = () => {
    if (mode === "single") return date ? format(date, "PPP") : placeholderText;
    if (range?.from) {
      if (variant === "compact") {
        return range.to
          ? `${format(range.from, "MMMM do, yyyy")} - ${format(range.to, "MMMM do, yyyy")}`
          : format(range.from, "MMMM do, yyyy");
      }
      return range.to
        ? `${format(range.from, "MMM d")} - ${format(range.to, "MMM d")}`
        : format(range.from, "MMM d");
    }
    return placeholderText;
  };

  const disabledDays = disableFuture
    ? { after: new Date() }
    : disablePast
      ? { before: startOfToday() }
      : undefined;

  const defaultMonth = disableFuture ? subMonths(new Date(), 1) : new Date();

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1 text-left",
        containerClassName,
      )}
    >
      {label && (
        <Text variant="label-sm" as="span" className="text-project-foreground">
          {label}
        </Text>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            aria-invalid={Boolean(error)}
            className={cn(
              "h-9 px-4 rounded-md transition-all cursor-pointer border-dashed border-project-border",
              variant === "compact"
                ? "bg-transparent hover:bg-transparent text-project-muted-foreground font-normal shadow-none"
                : "text-project-accent font-normal border-dashed border-project-border w-full md:w-40",
              className,
            )}
          >
            {variant === "compact" && (
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            )}

            <span className={cn(variant === "default" && "mr-auto")}>
              {getDisplayText()}
            </span>

            {variant === "compact" ? (
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            ) : (
              <CalendarIcon className="ml-2 h-5 w-5 text-project-accent" />
            )}
          </Button>
        </PopoverTrigger>

        {/* Sits above the side panel and modal layers, which own z-100 upward. */}
        <PopoverContent className="z-120 w-auto p-0" align="end">
          {mode === "single" ? (
            <Calendar
              mode="single"
              selected={date}
              disabled={disabledDays}
              onSelect={handleSingleSelect}
              defaultMonth={date ?? defaultMonth}
              numberOfMonths={1}
            />
          ) : (
            <Calendar
              mode="range"
              selected={range}
              disabled={disabledDays}
              onSelect={handleRangeSelect}
              defaultMonth={defaultMonth}
              numberOfMonths={2}
            />
          )}
        </PopoverContent>
      </Popover>

      {error && <p className="ml-1 text-xs text-project-destructive">{error}</p>}
    </div>
  );
};

export default AppDatePicker;
