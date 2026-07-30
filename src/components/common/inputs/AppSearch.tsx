"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/src/lib/utils/cn";

interface AppSearchProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  showIcon?: boolean;
  debounceMs?: number;
}

const AppSearch = ({
  value = "",
  onChange = () => {},
  placeholder = "Search...",
  className,
  containerClassName,
  showIcon = true,
  debounceMs = 400,
}: AppSearchProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Follow the parent when it changes the value itself.
  const [lastValue, setLastValue] = useState(value);
  if (value !== lastValue) {
    setLastValue(value);
    setLocalValue(value);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Debounce the parent callback
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return (
    <div className={cn("relative flex items-center", containerClassName)}>
      {/* Search Icon (Left Side) */}
      {showIcon && (
        <Search className="absolute left-3.5 size-4 text-project-muted-foreground" />
      )}

      {/* Input*/}
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full h-9 pr-4 bg-project-card text-project-accent border border-project-border rounded-md placeholder:text-project-muted-foreground text-sm outline-none transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-project-primary/20 focus-visible:border-project-primary",
          showIcon ? "pl-11" : "pl-4",
          className,
        )}
      />
    </div>
  );
};

export default React.memo(AppSearch);
