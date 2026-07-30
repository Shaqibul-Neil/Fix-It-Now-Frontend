import type { ReactNode } from "react";
import { Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";

interface IDetailsSectionProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

const DetailsSection = ({
  title,
  description,
  action,
  children,
  className,
}: IDetailsSectionProps) => {
  return (
    <section
      className={cn(
        "border border-project-border bg-project-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-project-border px-5 py-4">
        <div className="min-w-0">
          <Text
            variant="semibold-base"
            as="h2"
            className="uppercase tracking-[0.14em] text-project-accent"
          >
            {title}
          </Text>

          {description && (
            <Text
              variant="normal-sm"
              as="p"
              className="mt-1.5 text-project-muted-foreground"
            >
              {description}
            </Text>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className="px-5 py-5">{children}</div>
    </section>
  );
};

export default DetailsSection;
