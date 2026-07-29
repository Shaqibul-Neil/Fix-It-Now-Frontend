"use client";

import type { ComponentProps } from "react";
import { Checkbox } from "@/src/components/ui/checkbox";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

interface IAppCheckboxProps extends ComponentProps<typeof Checkbox> {
  label: string;
  error?: string;
}

const AppCheckbox = ({
  label,
  error,
  className,
  id,
  name,
  ...props
}: IAppCheckboxProps) => {
  const checkboxId = id ?? name;

  return (
    <div className="space-y-1">
      <div className="flex items-start gap-3">
        <Checkbox
          id={checkboxId}
          name={name}
          className={cn(
            "mt-0.5 border-project-border data-[state=checked]:bg-project-primary data-[state=checked]:border-project-primary cursor-pointer",
            className,
          )}
          {...props}
        />
        <Text
          variant="label-sm"
          as="label"
          htmlFor={checkboxId}
          className="text-project-muted-foreground font-medium cursor-pointer"
        >
          {label}
        </Text>
      </div>

      {error && (
        <p className="text-[10px] text-project-destructive ml-7">{error}</p>
      )}
    </div>
  );
};

export default AppCheckbox;
