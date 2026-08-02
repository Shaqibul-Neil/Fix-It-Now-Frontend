import { Check } from "lucide-react";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

interface IProfileChipsProps {
  items: string[];
  // "chip" is a wrapped pill row, "check" a ticked list for longer lines.
  variant?: "chip" | "check";
  emptyMessage?: string;
  className?: string;
}

const ProfileChips = ({
  items,
  variant = "chip",
  emptyMessage = "Nothing listed yet.",
  className,
}: IProfileChipsProps) => {
  if (items.length === 0) {
    return (
      <Text
        variant="normal-sm"
        as="p"
        className="text-project-muted-foreground"
      >
        {emptyMessage}
      </Text>
    );
  }

  if (variant === "check") {
    return (
      <ul className={cn("grid gap-2.5 sm:grid-cols-2", className)}>
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-project-primary" />
            <Text
              variant="normal-sm"
              as="span"
              className="text-project-foreground"
            >
              {item}
            </Text>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="border border-project-border bg-project-muted/50 px-3 py-1.5 text-xs font-medium text-project-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ProfileChips;
