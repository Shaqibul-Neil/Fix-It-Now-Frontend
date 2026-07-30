import type { ReactNode } from "react";
import { Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";

interface IChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ChartCard = ({ title, children, className }: IChartCardProps) => {
  return (
    <section
      className={cn(
        "border border-project-border bg-project-card p-5",
        className,
      )}
    >
      <Text
        variant="semibold-base"
        as="h2"
        className="mb-4 text-project-accent"
      >
        {title}
      </Text>

      {children}
    </section>
  );
};

export default ChartCard;
