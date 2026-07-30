"use client";

import type { TChartColorMap } from "@/src/types/chart.types";

interface ICustomTooltipProps {
  active?: boolean;
  payload?: {
    dataKey?: string | number;
    name?: string | number;
    value?: number;
  }[];
  label?: string | number;
  colors: TChartColorMap;
  valuePrefix?: string;
  showHeading?: boolean;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  colors,
  valuePrefix = "",
  showHeading = true,
}: ICustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-36 border border-project-border bg-project-card p-3 shadow-lg">
      {showHeading && label !== undefined && (
        <p className="mb-2 border-b border-project-border pb-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-project-muted-foreground">
          {label}
        </p>
      )}

      <ul className="space-y-1">
        {payload.map((entry) => {
          // Area and line rows carry dataKey, pie slices carry name.
          const key = String(entry.name ?? entry.dataKey ?? "");

          return (
            <li key={key} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-2 shrink-0"
                  style={{ backgroundColor: colors[key] }}
                />
                <span className="text-xs font-medium capitalize text-project-muted-foreground">
                  {String(entry.name ?? key).toLowerCase()}
                </span>
              </span>

              <span className="text-xs font-bold tabular-nums text-project-accent">
                {valuePrefix}
                {(entry.value ?? 0).toLocaleString()}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomTooltip;
