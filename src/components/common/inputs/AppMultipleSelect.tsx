"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { Popover } from "radix-ui";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";
import AppSearch from "./AppSearch";

interface Option {
  id: string;
  name: string;
  image?: string;
}

interface TProps {
  label: string;
  options: Option[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
  error?: string;
  searchPlaceholder?: string;
}

const AppMultipleSelect = ({
  label,
  options,
  selectedIds,
  onChange,
  placeholder,
  error,
  searchPlaceholder,
}: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering options dynamically based on the search term
  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm]);

  // Logic to add/remove IDs from the selection array
  const toggleOption = (id: string) => {
    const newSelection = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    onChange(newSelection);
  };

  // Determines what text to show in the collapsed trigger area
  const displayValue = useMemo(() => {
    if (selectedIds.length === 0) return placeholder || "Select items";
    const selectedNames = options
      .filter((opt) => selectedIds.includes(opt.id))
      .map((opt) => opt.name);
    return selectedNames.join(", ");
  }, [selectedIds, options, placeholder]);

  return (
    <div className="w-full flex flex-col gap-1.5 relative">
      <Text
        variant="label-sm"
        className="px-1 text-project-accent font-semibold"
      >
        {label}
      </Text>

      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <div
            className={cn(
              "flex h-9 w-full items-center justify-between rounded-lg border border-project-border bg-project-card px-4 cursor-pointer transition-all outline-none",
              isOpen
                ? "border-project-primary ring-2 ring-project-primary/10 shadow-sm"
                : "hover:border-project-primary/50",
              error && "border-project-destructive ring-project-destructive/20",
            )}
          >
            <span
              className={cn(
                "text-sm truncate pr-5",
                selectedIds.length === 0
                  ? "text-project-muted-foreground/40"
                  : "text-project-accent font-bold",
              )}
            >
              {displayValue}
            </span>
            <ChevronDown
              className={cn(
                "size-4 text-project-muted-foreground transition-transform duration-300",
                isOpen && "rotate-180",
              )}
            />
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={8}
            className="z-300 w-(--radix-popover-trigger-width) bg-project-card border border-project-border rounded-lg shadow-2xl p-0 overflow-hidden animate-in fade-in-0 slide-in-from-top-2"
          >
            {/* Using REUSABLE AppSearch for Search logic */}
            <div className="p-2 border-b border-project-border bg-project-muted/30">
              <AppSearch
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={searchPlaceholder || "Search Campaign..."}
                showIcon={true}
              />
            </div>

            <div className="max-h-62 overflow-y-auto p-2 custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isSelected = selectedIds.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleOption(opt.id)}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all mb-1 last:mb-0",
                        isSelected
                          ? "bg-project-muted-primary text-project-primary"
                          : "hover:bg-project-muted text-project-foreground",
                      )}
                    >
                      <div
                        className={cn(
                          "size-5 rounded-sm flex items-center justify-center border transition-all duration-200",
                          isSelected
                            ? "bg-project-primary border-project-primary"
                            : "border-project-border bg-project-card",
                        )}
                      >
                        {isSelected && (
                          <Check
                            className="size-3 text-project-primary-foreground"
                            strokeWidth={4}
                          />
                        )}
                      </div>
                      {/* IMAGE SUPPORT */}
                      {opt.image && (
                        <Image
                          src={opt.image}
                          alt={opt.name}
                          width={24}
                          height={24}
                          unoptimized
                          className="size-6 rounded-full object-cover border border-project-border shadow-sm"
                        />
                      )}
                      <span className="text-sm">{opt.name}</span>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-project-muted-foreground font-medium px-4">
                  No results found for {searchTerm}
                </div>
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {error && (
        <p className="text-xs text-project-destructive ml-1">{error}</p>
      )}
    </div>
  );
};

export default React.memo(AppMultipleSelect);
