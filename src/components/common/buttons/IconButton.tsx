import { cn } from "@/src/lib/utils/cn";
import type { ReactNode } from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "outline" | "destructive" | "primary" | "noOutline" | "ghost";
  type?: "submit" | "button" | "reset";
}

const IconButton = ({
  children,
  variant = "outline",
  className,
  type = "button",
  ...props
}: IconButtonProps) => {
  const variants = {
    outline:
      "border-project-border bg-project-card text-project-accent hover:bg-project-accent hover:text-project-background transition-all duration-500",
    destructive:
      "border-project-destructive/30 text-project-destructive hover:bg-project-destructive/10",
    primary:
      "border-project-primary/30 text-project-primary hover:bg-project-muted-primary transition-all",
    noOutline:
      "border-project-border bg-project-card text-project-accent hover:bg-project-accent hover:text-project-background transition-all duration-500",
    ghost:
      "border-transparent text-project-foreground hover:bg-project-muted-primary transition-colors duration-500",
  };
  return (
    <button
      type={type}
      className={cn(
        "flex items-center justify-center rounded-md border p-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer gap-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
