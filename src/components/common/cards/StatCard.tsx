import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { IStatData } from "@/src/types/types";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

// Props mirror the backend IStatData, so a stats item spreads straight in:
// {stats.map((stat) => <StatCard key={stat.id} {...stat} />)}
interface IStatCardProps extends IStatData {
  valuePrefix?: string;
  valueSuffix?: string;
  trendLabel?: string;
  className?: string;
}

const StatCard = ({
  label,
  value,
  changeValue,
  changePercentage,
  valuePrefix,
  valueSuffix,
  trendLabel = "vs previous period",
  className,
}: IStatCardProps) => {
  // Backend sends changePercentage for rates, changeValue for counts.
  const change = changePercentage ?? changeValue;
  const hasChange = change !== undefined;
  const isIncrease = hasChange && change > 0;
  const isFlat = change === 0;

  const changeText =
    changePercentage !== undefined
      ? `${Math.abs(changePercentage)}%`
      : Math.abs(changeValue ?? 0).toLocaleString();

  const TrendIcon = isIncrease ? ArrowUpRight : ArrowDownRight;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-project-border bg-project-card p-6",
        "transition-colors duration-300 hover:border-project-primary/40",
        className,
      )}
    >
      <Text
        variant="medium-sm"
        as="span"
        className="text-project-muted-foreground"
      >
        {label}
      </Text>

      <Text variant="bold-2xl" as="span" className="text-project-accent">
        {valuePrefix}
        {value.toLocaleString()}
        {valueSuffix}
      </Text>

      {hasChange && (
        <div className="flex items-center gap-1 text-sm">
          {isFlat ? (
            <Text
              variant="normal-sm"
              as="span"
              className="text-project-muted-foreground"
            >
              No change
            </Text>
          ) : (
            <span
              className={cn(
                "flex items-center gap-0.5 font-semibold",
                isIncrease
                  ? "text-project-success"
                  : "text-project-destructive",
              )}
            >
              <TrendIcon className="size-4 shrink-0" />
              {changeText}
            </span>
          )}

          <Text
            variant="normal-sm"
            as="span"
            className="text-project-muted-foreground"
          >
            {trendLabel}
          </Text>
        </div>
      )}
    </div>
  );
};

export default StatCard;
