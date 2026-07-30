"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

interface IAppTimePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  minuteStep?: number;
  minTime?: string;
  maxTime?: string;
  className?: string;
}

interface ITimeStepperProps {
  text: string;
  ariaLabel: string;
  onStep: (delta: number) => void;
  canDecrease: boolean;
  canIncrease: boolean;
}

const STEP_BUTTON =
  "flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-project-muted-foreground transition-colors hover:bg-project-muted hover:text-project-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-project-muted-foreground";

const pad = (value: number) => String(value).padStart(2, "0");

const toMinutes = (time: string) => {
  const [hour, minute] = time.split(":");
  return (Number(hour) || 0) * 60 + (Number(minute) || 0);
};

const TimeStepper = ({
  text,
  ariaLabel,
  onStep,
  canDecrease,
  canIncrease,
}: ITimeStepperProps) => (
  <div className="flex h-7 flex-1 items-center justify-between gap-1 rounded-md bg-project-muted/40 px-0.5">
    <button
      type="button"
      className={STEP_BUTTON}
      disabled={!canDecrease}
      aria-label={`Decrease ${ariaLabel}`}
      onClick={() => onStep(-1)}
    >
      <ChevronLeft size={16} />
    </button>

    <span
      role="spinbutton"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-valuetext={text}
      onKeyDown={(event) => {
        const up = event.key === "ArrowRight" || event.key === "ArrowUp";
        const down = event.key === "ArrowLeft" || event.key === "ArrowDown";
        if (!up && !down) return;
        event.preventDefault();
        onStep(up ? 1 : -1);
      }}
      className="rounded-md px-1 text-center text-sm font-semibold tabular-nums text-project-accent outline-none focus-visible:ring-2 focus-visible:ring-project-primary/30"
    >
      {text}
    </span>

    <button
      type="button"
      className={STEP_BUTTON}
      disabled={!canIncrease}
      aria-label={`Increase ${ariaLabel}`}
      onClick={() => onStep(1)}
    >
      <ChevronRight size={16} />
    </button>
  </div>
);

const AppTimePicker = ({
  label,
  value,
  onChange,
  error,
  minuteStep = 30,
  minTime = "00:00",
  maxTime = "23:59",
  className,
}: IAppTimePickerProps) => {
  const floor = toMinutes(minTime);
  const ceiling = toMinutes(maxTime);
  const current = toMinutes(value);

  const hour24 = Math.floor(current / 60);
  const isPm = hour24 >= 12;

  // Every control lands on a step from the floor, and never leaves the window.
  const snap = (next: number) => {
    const bounded = Math.min(ceiling, Math.max(floor, next));
    const stepped =
      floor + Math.round((bounded - floor) / minuteStep) * minuteStep;
    return Math.min(ceiling, Math.max(floor, stepped));
  };

  const emit = (next: number) => {
    const snapped = snap(next);
    onChange(`${pad(Math.floor(snapped / 60))}:${pad(snapped % 60)}`);
  };

  const canReach = (next: number) => snap(next) !== snap(current);

  return (
    <div
      className={cn("flex w-full min-w-0 flex-col gap-1 text-left", className)}
    >
      {label && (
        <Text variant="label-sm" as="span" className="text-project-foreground">
          {label}
        </Text>
      )}

      <div
        aria-invalid={Boolean(error)}
        className="flex h-9 items-center gap-2 rounded-md border border-project-border bg-project-card px-1 aria-invalid:border-project-destructive"
      >
        <TimeStepper
          text={pad(hour24 % 12 || 12)}
          ariaLabel="hour"
          onStep={(delta) => emit(current + delta * 60)}
          canDecrease={canReach(current - 60)}
          canIncrease={canReach(current + 60)}
        />

        <TimeStepper
          text={pad(current % 60)}
          ariaLabel="minute"
          onStep={(delta) => emit(current + delta * minuteStep)}
          canDecrease={canReach(current - minuteStep)}
          canIncrease={canReach(current + minuteStep)}
        />

        <TimeStepper
          text={isPm ? "PM" : "AM"}
          ariaLabel="AM or PM"
          onStep={() => emit(current + (isPm ? -720 : 720))}
          canDecrease={canReach(current + (isPm ? -720 : 720))}
          canIncrease={canReach(current + (isPm ? -720 : 720))}
        />
      </div>

      {error && (
        <p className="ml-1 text-xs text-project-destructive">{error}</p>
      )}
    </div>
  );
};

export default AppTimePicker;
