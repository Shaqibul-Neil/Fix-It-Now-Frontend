import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Text } from "@/src/components";
import type { IStatData } from "@/src/types/types";
import { cn } from "@/src/lib/utils/cn";

interface IStatCardProps extends IStatData {
  trendLabel?: string;
  linkText?: string;
  className?: string;
}

const CURRENCY = "৳";

const StatCard = ({
  id,
  label,
  value,
  changeValue,
  changePercentage,
  href,
  trendLabel = "vs previous period",
  linkText = "View all",
  className,
}: IStatCardProps) => {
  const isRate = id.endsWith("_rate");
  const isMoney = id === "revenue" || id === "earnings";
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
        "group relative overflow-hidden border border-project-border bg-project-card p-4 pl-5",
        "transition-colors duration-500 hover:border-project-primary/50",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-0.5 bg-project-primary/25 transition-colors duration-500 group-hover:bg-project-primary"
      />

      <Text
        variant="medium-xs"
        as="span"
        className="block text-[11px] uppercase leading-tight tracking-[0.12em] text-project-muted-foreground"
      >
        {label}
      </Text>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <Text
          variant="bold-2xl"
          as="span"
          className="tabular-nums leading-none text-project-accent"
        >
          {isMoney && CURRENCY}
          {value.toLocaleString()}
          {isRate && "%"}
        </Text>

        {hasChange && !isFlat && (
          <span
            className={cn(
              "flex shrink-0 items-center gap-0.5 border px-1 py-0.5",
              "text-[11px] font-semibold tabular-nums leading-none",
              isIncrease
                ? "border-project-success/30 bg-project-success/10 text-project-success"
                : "border-project-destructive/30 bg-project-destructive/10 text-project-destructive",
            )}
          >
            <TrendIcon className="size-3 shrink-0" />
            {changeText}
          </span>
        )}
      </div>

      {hasChange && (
        <Text
          variant="normal-xs"
          as="span"
          className="mt-2 block text-[11px] leading-tight text-project-muted-foreground"
        >
          {isFlat ? "No change" : trendLabel}
        </Text>
      )}

      {/* The stretched span makes the whole card the click target, so the row
          reads as one control instead of a card with a small link in it. */}
      {href && (
        <Link
          href={href}
          className="mt-3 flex items-center gap-1 border-t border-project-border pt-2.5 text-[11px] font-medium text-project-muted-foreground transition-colors duration-300 group-hover:text-project-primary"
        >
          {linkText}
          <ArrowUpRight className="size-3 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <span aria-hidden className="absolute inset-0" />
        </Link>
      )}
    </div>
  );
};

export default StatCard;
