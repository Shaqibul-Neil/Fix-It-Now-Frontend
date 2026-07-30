"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";
import { ChevronDown, Search } from "lucide-react";
import { useState, type UIEvent } from "react";

interface TAppSelectProps {
  label?: string;
  options?: { label: string; value: string }[];
  className?: string;
  containerClassName?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  size?: "sm" | "default";
  // enable client-side infinite scroll — shows pageSize items initially,
  // loads more as user scrolls to the bottom of the dropdown
  infiniteScroll?: boolean;
  pageSize?: number;
}

const AppSelect = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
  disabled,
  className,
  containerClassName,
  size = "default",
  infiniteScroll = false,
  pageSize = 7,
}: TAppSelectProps) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [search, setSearch] = useState("");

  const filteredOptions =
    infiniteScroll && search
      ? options?.filter((opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase()),
        )
      : options;

  const visibleOptions = infiniteScroll
    ? filteredOptions?.slice(0, visibleCount)
    : options;

  const hasMore =
    infiniteScroll && visibleCount < (filteredOptions?.length ?? 0);

  // capture-phase scroll: catches scroll from inner fixed-height div (scroll doesn't bubble)
  const handleScrollCapture = (e: UIEvent<HTMLDivElement>) => {
    if (!hasMore) return;
    const target = e.target as HTMLElement;
    if (target.scrollHeight - target.scrollTop - target.clientHeight < 60) {
      setVisibleCount((prev) =>
        Math.min(prev + pageSize, filteredOptions?.length ?? 0),
      );
    }
  };

  // in infinite scroll mode, include options.length in key so Select remounts
  // when options finish loading — fixes edit-mode prefill where value is set
  // before async options arrive and the trigger shows placeholder instead of label
  const selectKey = infiniteScroll
    ? `${value ?? ""}-${options?.length ?? 0}`
    : (value ?? "");

  return (
    <div className={cn("flex w-full min-w-0 flex-col", containerClassName)}>
      {label && (
        <Text variant="label-sm" as="label" className="text-project-foreground">
          {label}
        </Text>
      )}
      <Select
        key={selectKey}
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        onOpenChange={(open) => {
          if (!open) {
            setSearch("");
            setVisibleCount(pageSize);
          }
        }}
      >
        <SelectTrigger
          size={size}
          className={cn(
            "w-full rounded-lg border-dashed border-project-border focus:ring-project-primary bg-project-card cursor-pointer capitalize",
            "h-9",
            className,
            error && "border-project-destructive ring-project-destructive/20",
            "data-placeholder:text-project-accent",
          )}
        >
          <SelectValue placeholder={placeholder}>
            {value
              ? (options?.find((opt) => opt.value === value)?.label ??
                placeholder)
              : undefined}
          </SelectValue>
        </SelectTrigger>

        <SelectContent
          position={infiniteScroll ? "popper" : "item-aligned"}
          sideOffset={4}
          className="z-300 rounded-md border-dashed border-project-border shadow-2xl p-2 animate-in fade-in-0 zoom-in-95 capitalize"
          onScrollCapture={infiniteScroll ? handleScrollCapture : undefined}
        >
          {infiniteScroll && (
            <div
              className="mb-2 flex items-center gap-2 rounded-md border border-project-border bg-project-muted/30 px-2 py-1.5"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Search className="size-3 shrink-0 text-project-muted-foreground" />
              <input
                type="text"
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-project-muted-foreground"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(pageSize);
                }}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className={cn(infiniteScroll && "max-h-52 overflow-y-auto")}>
            {visibleOptions?.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className={cn(
                  "rounded-md p-2 mb-1 last:mb-0 cursor-pointer transition-all duration-200 font-semibold capitalize text-xs",
                  "focus:bg-project-muted-primary focus:text-project-primary data-[state=checked]:bg-project-muted-primary data-[state=checked]:text-project-primary",
                )}
              >
                {opt.label}
              </SelectItem>
            ))}
            {hasMore && (
              <button
                type="button"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() =>
                  setVisibleCount((prev) =>
                    Math.min(prev + pageSize, filteredOptions?.length ?? 0),
                  )
                }
                className="w-full py-1.5 flex items-center justify-center gap-1 text-xs text-project-muted-foreground hover:text-project-primary cursor-pointer transition-colors rounded-md hover:bg-project-muted-primary"
              >
                <span>Load more</span>
                <ChevronDown className="size-3" />
              </button>
            )}
          </div>
        </SelectContent>
      </Select>
      {error && (
        <p className="text-xs text-project-destructive ml-1 capitalize">
          {error}
        </p>
      )}
    </div>
  );
};
export default AppSelect;
