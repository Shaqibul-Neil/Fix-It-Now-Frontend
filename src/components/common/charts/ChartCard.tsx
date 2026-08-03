import type { ReactNode } from "react";
import { Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";

interface IChartCardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
}

const ChartCard = ({
  title,
  action,
  children,
  id,
  className,
}: IChartCardProps) => {
  return (
    <section
      id={id}
      className={cn(
        "border border-project-border bg-project-card p-5",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <Text variant="semibold-base" as="h2" className="text-project-accent">
          {title}
        </Text>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {children}
    </section>
  );
};

export default ChartCard;
