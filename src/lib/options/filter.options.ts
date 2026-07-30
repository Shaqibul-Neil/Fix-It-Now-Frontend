import type { IFilterConfig, TPeriod } from "@/src/types/filter.types";

export const DEFAULT_PERIOD: TPeriod = "30";

export const FILTER_OPTIONS: IFilterConfig = {
  period: {
    options: [
      { label: "Last 7 days", value: "7" satisfies TPeriod },
      { label: "Last 30 days", value: "30" satisfies TPeriod },
      { label: "Last 90 days", value: "90" satisfies TPeriod },
    ],
  },
};
