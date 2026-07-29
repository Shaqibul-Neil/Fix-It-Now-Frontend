import type { ComponentProps } from "react";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

interface IAppTextAreaProps extends ComponentProps<"textarea"> {
  label: string;
  error?: string;
}

const AppTextArea = ({
  label,
  error,
  className,
  id,
  name,
  ...props
}: IAppTextAreaProps) => {
  const textAreaId = id ?? name;

  return (
    <div className="w-full flex flex-col gap-1 text-left">
      <Text
        variant="label-sm"
        as="label"
        htmlFor={textAreaId}
        className="text-project-foreground"
      >
        {label}
      </Text>

      <Textarea
        id={textAreaId}
        name={name}
        aria-invalid={Boolean(error)}
        className={cn(
          "min-h-25 px-4 py-2.5 bg-project-card text-project-accent border-project-border rounded-md resize-none",
          "placeholder:text-project-muted-foreground/50",
          "focus-visible:border-project-primary focus-visible:ring-project-primary/20",
          className,
        )}
        {...props}
      />

      {error && (
        <p className="text-xs text-project-destructive ml-1">{error}</p>
      )}
    </div>
  );
};

export default AppTextArea;
