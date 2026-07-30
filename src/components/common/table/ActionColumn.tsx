"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, type LucideIcon } from "lucide-react";
import { IconButton } from "@/src/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

export type TTableAction<T> = {
  label?: string;
  icon: LucideIcon;
  variant?: "outline" | "destructive" | "primary" | "noOutline" | "ghost";
  className?: string;
  disabled?: boolean;
  /** When it returns true for a row, the action is left out of that row entirely */
  hidden?: (row: T) => boolean;
  onClick: (row: T) => void;
};

interface IActionColumnOptions {
  // Three or more actions read better behind a menu than as a row of icons.
  asDropdown?: boolean;
}

// Not a component — a column factory, called alongside the other columns.
const ActionColumn = <T,>(
  actions: TTableAction<T>[],
  options?: IActionColumnOptions,
): ColumnDef<T> => {
  return {
    id: "actions",
    size: 120,
    header: () => <div className="text-center">Actions</div>,

    cell: ({ row }) => {
      const visibleActions = actions.filter(
        (action) => !action.hidden?.(row.original),
      );
      if (visibleActions.length === 0) return null;

      if (options?.asDropdown) {
        return (
          <div className="flex w-full items-center justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <IconButton variant="outline" className="size-8">
                  <MoreVertical size={14} />
                </IconButton>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="flex w-48 flex-col gap-1 border-project-border p-1.5"
              >
                {visibleActions.map(({ icon: Icon, ...action }, index) => (
                  <IconButton
                    key={action.label ?? index}
                    variant={action.variant ?? "ghost"}
                    className={`justify-start px-2 text-sm ${action.className ?? ""}`}
                    disabled={action.disabled}
                    onClick={() => action.onClick(row.original)}
                  >
                    <Icon size={14} />
                    {action.label}
                  </IconButton>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        );
      }

      return (
        <div className="flex w-full items-center justify-center gap-2">
          {visibleActions.map(({ icon: Icon, ...action }, index) => (
            <IconButton
              key={action.label ?? index}
              variant={action.variant ?? "outline"}
              className={`size-8 ${action.className ?? ""}`}
              disabled={action.disabled}
              onClick={() => action.onClick(row.original)}
              aria-label={action.label}
            >
              <Icon size={14} />
            </IconButton>
          ))}
        </div>
      );
    },
  };
};

export default ActionColumn;
