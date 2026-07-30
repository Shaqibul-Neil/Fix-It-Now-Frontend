import { cn } from "@/src/lib/utils/cn";
import type { IChartSeries, TChartColorMap } from "@/src/types/chart.types";

interface IChartLegendProps {
  series: IChartSeries[];
  colors: TChartColorMap;
  valuePrefix?: string;
  className?: string;
}

const ChartLegend = ({
  series,
  colors,
  valuePrefix = "",
  className,
}: IChartLegendProps) => {
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
      {series.map(({ id, label, total }) => (
        <li key={id} className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-2.5 shrink-0"
            style={{ backgroundColor: colors[id] }}
          />

          <span className="whitespace-nowrap text-xs font-medium capitalize text-project-accent">
            {label}
            {total !== undefined && (
              <span className="ml-1 tabular-nums text-project-muted-foreground">
                ({valuePrefix}
                {total.toLocaleString()})
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ChartLegend;
