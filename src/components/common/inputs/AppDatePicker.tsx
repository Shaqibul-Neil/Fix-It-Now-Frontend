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
import { differenceInDays, format, subDays, subMonths } from "date-fns";
import { cn } from "@/src/lib/utils/cn";

interface TAppDatePickerProps {
  mode?: "single" | "range";
  minDays?: number;
  maxDays?: number;
  disableFuture?: boolean;
  initialRange?: DateRange;
  onDateChange?: (date: Date | undefined) => void;
  onRangeChange?: (range: DateRange | undefined) => void;
  className?: string;
  placeholderText?: string;
  variant?: "default" | "compact";
}

const AppDatePicker = ({
  mode = "range",
  minDays,
  // Default cap: a one-year span. Consumers no longer pass maxDays={365};
  // override only when a tighter cap is required.
  maxDays = 365,
  disableFuture = false,
  initialRange,
  onDateChange,
  onRangeChange,
  className,
  placeholderText = "Filter by Date",
  variant = "default",
}: TAppDatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<DateRange | undefined>(initialRange);

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
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

      <PopoverContent className="w-auto p-0" align="end">
        {mode === "single" ? (
          <Calendar
            mode="single"
            selected={date}
            disabled={disableFuture ? { after: new Date() } : undefined}
            onSelect={handleSingleSelect}
            defaultMonth={subMonths(new Date(), 1)}
            numberOfMonths={1}
          />
        ) : (
          <Calendar
            mode="range"
            selected={range}
            disabled={disableFuture ? { after: new Date() } : undefined}
            onSelect={handleRangeSelect}
            defaultMonth={subMonths(new Date(), 1)}
            numberOfMonths={2}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AppDatePicker;
