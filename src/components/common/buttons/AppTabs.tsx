"use client";

import { cn } from "@/src/lib/utils/cn";
import type { TSelectOption } from "@/src/types/filter.types";

interface IAppTabsProps {
  options: TSelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// One moving pill instead of a background per tab, so the slide is a single
// transform — nothing to measure, and no animation library to install.
const AppTabs = ({ options, value, onChange, className }: IAppTabsProps) => {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <div
      className={cn(
        "relative grid h-9 w-full items-center rounded-lg border border-project-border bg-project-card p-1 sm:w-fit",
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 rounded-md bg-project-primary transition-transform duration-500 ease-out"
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 flex h-7 min-w-0 cursor-pointer items-center justify-center rounded-md",
              // Below `sm` the tracking and side padding go first — pure width, no meaning.
              "gap-1 px-1.5 text-[10px] tracking-normal",
              "sm:gap-2 sm:px-3 sm:text-xs sm:tracking-[0.12em]",
              "font-bold uppercase whitespace-nowrap transition-colors duration-500",
              isActive
                ? "text-project-primary-foreground"
                : "text-project-muted-foreground hover:text-project-accent",
            )}
          >
            {option.dotClassName && (
              <span
                aria-hidden
                className={cn(
                  "size-1 shrink-0 rounded-full sm:size-1.5",
                  isActive
                    ? "bg-project-primary-foreground"
                    : option.dotClassName,
                )}
              />
            )}

            <span className="truncate">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AppTabs;
