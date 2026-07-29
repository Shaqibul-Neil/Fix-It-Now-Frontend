import type { ComponentProps, ReactNode } from "react";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

// No hooks here, so this stays usable from Server Components.
// Password fields live in AppPasswordInput — the eye toggle needs state.
interface IAppInputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const AppInput = ({
  label,
  error,
  className,
  leftElement,
  rightElement,
  id,
  name,
  ...props
}: IAppInputProps) => {
  const inputId = id ?? name;

  return (
    <div className="w-full flex flex-col gap-1 text-left">
      <Text
        variant="label-sm"
        as="label"
        htmlFor={inputId}
        className="text-project-foreground"
      >
        {label}
      </Text>

      <div className="relative">
        {leftElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-project-muted-foreground">
            {leftElement}
          </div>
        )}

        <Input
          id={inputId}
          name={name}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-9 bg-project-card text-project-accent border-project-border rounded-md",
            "placeholder:text-project-muted-foreground/50",
            "focus-visible:border-project-primary focus-visible:ring-project-primary/20",
            leftElement ? "pl-10" : "pl-4",
            rightElement ? "pr-10" : "pr-4",
            className,
          )}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-project-muted-foreground">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-project-destructive ml-1">{error}</p>
      )}
    </div>
  );
};

export default AppInput;
