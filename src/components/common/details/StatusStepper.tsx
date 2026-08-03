import { Check } from "lucide-react";
import { Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";

export interface IStatusStep {
  key: string;
  label: string;
}

interface IStatusStepperProps {
  steps: IStatusStep[];
  currentIndex: number;
  className?: string;
}

const StatusStepper = ({
  steps,
  currentIndex,
  className,
}: IStatusStepperProps) => {
  return (
    <ol className={cn("flex w-full", className)}>
      {steps.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <li
            key={step.key}
            className="flex min-w-0 flex-1 flex-col gap-2 last:flex-none"
          >
            <div className="flex items-center">
              <span
                aria-hidden
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center border text-[9px] font-semibold tabular-nums",
                  isDone &&
                    "border-project-primary bg-project-muted-primary text-project-primary",
                  isCurrent &&
                    "border-project-primary bg-project-primary text-project-primary-foreground",
                  !isDone &&
                    !isCurrent &&
                    "border-project-border text-project-muted-foreground",
                )}
              >
                {isDone ? <Check className="size-3" /> : index + 1}
              </span>

              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    "h-px flex-1",
                    isDone ? "bg-project-primary" : "bg-project-border",
                  )}
                />
              )}
            </div>

            <Text
              variant="medium-xs"
              as="span"
              className={cn(
                "truncate pr-2 text-[10px] uppercase tracking-[0.12em]",
                isCurrent
                  ? "text-project-primary"
                  : "text-project-muted-foreground",
              )}
            >
              {step.label}
            </Text>
          </li>
        );
      })}
    </ol>
  );
};

export default StatusStepper;
