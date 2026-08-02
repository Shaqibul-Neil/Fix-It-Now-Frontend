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
              "relative z-10 flex h-7 cursor-pointer items-center justify-center gap-2 rounded-md px-3",
              "text-xs font-bold uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-500",
              isActive
                ? "text-project-primary-foreground"
                : "text-project-muted-foreground hover:text-project-accent",
            )}
          >
            {option.dotClassName && (
              <span
                aria-hidden
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  isActive
                    ? "bg-project-primary-foreground"
                    : option.dotClassName,
                )}
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default AppTabs;
