"use client";

import { ListFilter } from "lucide-react";
import { IconButton } from "@/src/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils/cn";

interface IViewOption {
  label: string;
  value: string;
}

interface ITableViewSwitcherProps {
  value: string;
  onChange: (value: string) => void;
  options: IViewOption[];
}

const TableViewSwitcher = ({
  value,
  onChange,
  options,
}: ITableViewSwitcherProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* A filter glyph, not a kebab — this swaps the whole view, it is not
            a per-row menu. */}
        <IconButton
          variant="outline"
          className="size-9"
          aria-label="Change view"
        >
          <ListFilter size={15} />
        </IconButton>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="mt-2 flex w-48 flex-col gap-1 border-project-border p-1.5"
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex cursor-pointer items-center px-2 py-2 text-sm transition-colors duration-300",
              value === option.value
                ? "bg-project-primary font-semibold text-project-primary-foreground"
                : "text-project-foreground hover:bg-project-muted-primary hover:text-project-primary",
            )}
          >
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default TableViewSwitcher;
