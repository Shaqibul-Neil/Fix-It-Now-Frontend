"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

// Split from AppInput so the useState here does not drag every plain text
// field into the client bundle.
interface IAppPasswordInputProps extends Omit<ComponentProps<"input">, "type"> {
  label: string;
  error?: string;
}

const AppPasswordInput = ({
  label,
  error,
  className,
  id,
  name,
  ...props
}: IAppPasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
        <Input
          id={inputId}
          name={name}
          type={isPasswordVisible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-9 pl-4 pr-10 bg-project-card text-project-accent border-project-border rounded-md",
            "placeholder:text-project-muted-foreground/50",
            "focus-visible:border-project-primary focus-visible:ring-project-primary/20",
            className,
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => setIsPasswordVisible((visible) => !visible)}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-project-muted-foreground hover:text-project-primary transition-colors duration-300"
        >
          {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <p className="text-xs text-project-destructive ml-1">{error}</p>
      )}
    </div>
  );
};

export default AppPasswordInput;
