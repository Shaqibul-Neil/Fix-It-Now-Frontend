"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/src/lib/utils/cn";

const ThemeToggle = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "flex size-9 items-center justify-center rounded-none border border-project-border",
        "bg-project-card text-project-muted-foreground cursor-pointer",
        "hover:text-project-primary hover:border-project-primary/40 transition-colors duration-300",
        className,
      )}
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
};

export default ThemeToggle;
