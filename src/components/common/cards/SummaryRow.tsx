import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

interface ISummaryRowProps {
  label: string;
  value?: ReactNode;
  fallback?: string;
  className?: string;
}

const SummaryRow = ({
  label,
  value,
  fallback = "Not provided",
  className,
}: ISummaryRowProps) => {
  const isEmpty = value === undefined || value === null || value === "";

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-6 border-b border-project-border py-3 last:border-b-0",
        className,
      )}
    >
      <Text
        variant="medium-sm"
        as="span"
        className="shrink-0 text-project-muted-foreground"
      >
        {label}
      </Text>

      <Text
        variant="semibold-sm-2"
        as="span"
        className={cn(
          "min-w-0 wrap-break-word text-right",
          isEmpty
            ? "italic text-project-muted-foreground/60"
            : "text-project-accent",
        )}
      >
        {isEmpty ? fallback : value}
      </Text>
    </div>
  );
};

export default SummaryRow;
