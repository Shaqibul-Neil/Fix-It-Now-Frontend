"use client";

import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { DateRange } from "react-day-picker";
import { AppDatePicker, AppSelect } from "@/src/components";
import { FILTER_OPTIONS } from "@/src/lib/options/filter.options";

interface IDashboardFilterProps {
  timePeriod?: { from: string; to: string };
  isFetching?: boolean;
}

const DashboardFilter = ({ timePeriod, isFetching }: IDashboardFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const period = searchParams.get("period");
  const hasCustomRange = Boolean(searchParams.get("from"));

  const push = (query: string) =>
    router.push(`${pathname}?${query}`, { scroll: false });

  const handleRange = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return;

    push(
      `from=${format(range.from, "yyyy-MM-dd")}&to=${format(range.to, "yyyy-MM-dd")}`,
    );
  };

  const from = timePeriod?.from;
  const to = timePeriod?.to;
  const resolvedRange = useMemo<DateRange | undefined>(
    () => (from && to ? { from: new Date(from), to: new Date(to) } : undefined),
    [from, to],
  );

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
      <AppSelect
        placeholder={hasCustomRange ? "Filter By Period" : "Last 30 days"}
        options={FILTER_OPTIONS.period.options}
        value={period ?? undefined}
        onChange={(value) => push(`period=${value}`)}
      />

      <div className="flex min-w-40 flex-col">
        <AppDatePicker
          mode="range"
          disableFuture
          initialRange={resolvedRange}
          onRangeChange={handleRange}
        />
      </div>

      {isFetching && (
        <Loader2 className="mb-2.5 size-4 shrink-0 animate-spin text-project-primary" />
      )}
    </div>
  );
};

export default DashboardFilter;
