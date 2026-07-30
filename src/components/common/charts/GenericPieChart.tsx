"use client";

import { memo, useMemo } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";
import type { IPieSlice, TChartColorMap } from "@/src/types/chart.types";
import CustomTooltip from "./CustomTooltip";

interface IGenericPieChartProps {
  data: IPieSlice[];
  colors: TChartColorMap;
  centerLabel?: string;
  centerValue?: string;
  valuePrefix?: string;
  className?: string;
}

const GenericPieChart = memo(
  ({
    data,
    colors,
    centerLabel,
    centerValue,
    valuePrefix = "",
    className,
  }: IGenericPieChartProps) => {
    const slices = useMemo(
      () => data.map((slice) => ({ ...slice, fill: colors[slice.name] })),
      [data, colors],
    );

    return (
      <div className={cn("relative h-60 w-full", className)}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              cursor={false}
              content={
                <CustomTooltip
                  colors={colors}
                  valuePrefix={valuePrefix}
                  showHeading={false}
                />
              }
            />

            <Pie
              data={slices}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              stroke="none"
              labelLine={false}
            />
          </PieChart>
        </ResponsiveContainer>

        {centerValue && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1">
            <Text
              variant="bold-xl"
              as="span"
              className="tabular-nums text-project-accent"
            >
              {centerValue}
            </Text>

            <Text
              variant="normal-xs"
              as="span"
              className="uppercase tracking-[0.16em] text-project-muted-foreground"
            >
              {centerLabel}
            </Text>
          </div>
        )}
      </div>
    );
  },
);

GenericPieChart.displayName = "GenericPieChart";

export default GenericPieChart;
