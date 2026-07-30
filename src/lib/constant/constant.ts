import { IChartSeries } from "@/src/types/chart.types";

export const TREND_SERIES: IChartSeries[] = [
  { id: "current", label: "This period" },
  { id: "previous", label: "Previous period" },
];

// Must stay one of DataTablePagination's PAGE_SIZES.
export const DEFAULT_PAGE_SIZE = 6;
