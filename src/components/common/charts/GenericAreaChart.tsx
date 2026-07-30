"use client";

import { memo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/src/lib/utils/cn";
import type {
  IChartPoint,
  IChartSeries,
  TAreaCurve,
  TChartColorMap,
} from "@/src/types/chart.types";
import CustomTooltip from "./CustomTooltip";

interface IGenericAreaChartProps {
  data: IChartPoint[];
  series: IChartSeries[];
  colors: TChartColorMap;
  stacked?: boolean;
  showGrid?: boolean;
  curve?: TAreaCurve;
  strokeWidth?: number;
  gradientOpacity?: { top: number; bottom: number };
  yAxisFormatter?: (value: number) => string;
  valuePrefix?: string;
  className?: string;
}

const GenericAreaChart = memo(
  ({
    data,
    series,
    colors,
    stacked = false,
    showGrid = true,
    curve = "monotone",
    strokeWidth = 2,
    gradientOpacity = { top: 0.45, bottom: 0 },
    yAxisFormatter,
    valuePrefix = "",
    className,
  }: IGenericAreaChartProps) => {
    return (
      <div className={cn("aspect-16/7 w-full", className)}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
            className="select-none outline-none"
          >
            <defs>
              {series.map(({ id }) => (
                <linearGradient
                  key={id}
                  id={`area-gradient-${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={colors[id]}
                    stopOpacity={gradientOpacity.top}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors[id]}
                    stopOpacity={gradientOpacity.bottom}
                  />
                </linearGradient>
              ))}
            </defs>

            {showGrid && (
              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="4 4"
              />
            )}

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={
                yAxisFormatter ?? ((value) => `${valuePrefix}${value}`)
              }
            />

            <Tooltip
              shared
              content={
                <CustomTooltip colors={colors} valuePrefix={valuePrefix} />
              }
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
            />

            {series.map(({ id }) => (
              <Area
                key={id}
                type={curve}
                dataKey={id}
                stroke={colors[id]}
                strokeWidth={strokeWidth}
                fill={`url(#area-gradient-${id})`}
                fillOpacity={1}
                // One shared stackId turns the areas into a stack; without it
                // they draw on top of each other.
                stackId={stacked ? "stack" : undefined}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: colors[id] }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

GenericAreaChart.displayName = "GenericAreaChart";

export default GenericAreaChart;
