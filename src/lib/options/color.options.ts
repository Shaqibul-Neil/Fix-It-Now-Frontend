import type { TChartColorMap } from "@/src/types/chart.types";

const CHART_TOKEN = {
  brass: "var(--chart-1)",
  green: "var(--chart-2)",
  blue: "var(--chart-3)",
  amber: "var(--chart-4)",
  violet: "var(--chart-5)",
  muted: "var(--muted-foreground)",
  danger: "var(--destructive)",
} as const;

const STATUS_COLORS: TChartColorMap = {
  REQUESTED: CHART_TOKEN.muted,
  ACCEPTED: CHART_TOKEN.blue,
  PAID: CHART_TOKEN.brass,
  IN_PROGRESS: CHART_TOKEN.amber,
  COMPLETED: CHART_TOKEN.green,
  DECLINED: CHART_TOKEN.danger,
  CANCELLED: CHART_TOKEN.danger,
};

const TREND_COLORS: TChartColorMap = {
  current: CHART_TOKEN.brass,
  previous: CHART_TOKEN.muted,
};

export const CHART_COLORS = {
  bookingsByStatus: STATUS_COLORS,
  jobsByStatus: STATUS_COLORS,
  revenueTrend: TREND_COLORS,
  earningsTrend: TREND_COLORS,
} as const satisfies Record<string, TChartColorMap>;

export const CHART_PALETTE = [
  CHART_TOKEN.brass,
  CHART_TOKEN.green,
  CHART_TOKEN.blue,
  CHART_TOKEN.amber,
  CHART_TOKEN.violet,
] as const;

export const mapPaletteTo = (keys: string[]): TChartColorMap =>
  Object.fromEntries(
    keys.map((key, index) => [
      key,
      CHART_PALETTE[index % CHART_PALETTE.length],
    ]),
  );
