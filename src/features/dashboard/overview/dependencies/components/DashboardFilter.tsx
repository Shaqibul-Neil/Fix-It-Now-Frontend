"use client";

import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DateRange } from "react-day-picker";
import { AppDatePicker, AppSelect, Text } from "@/src/components";
import { FILTER_OPTIONS } from "@/src/lib/options/filter.options";

const DashboardFilter = ({ isFetching }: { isFetching?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = (query: string) =>
    router.push(`${pathname}?${query}`, { scroll: false });

  const handleRange = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return;

    push(
      `from=${format(range.from, "yyyy-MM-dd")}&to=${format(range.to, "yyyy-MM-dd")}`,
    );
  };

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
      <AppSelect
        label="Period"
        placeholder="Last 30 Days"
        options={FILTER_OPTIONS.period.options}
        value={searchParams.get("period") ?? undefined}
        onChange={(value) => push(`period=${value}`)}
      />

      <div className="flex min-w-40 flex-col">
        <Text variant="label-sm" as="label" className="text-project-foreground">
          Or pick dates
        </Text>

        <AppDatePicker mode="range" disableFuture onRangeChange={handleRange} />
      </div>

      {isFetching && (
        <Loader2 className="mb-2.5 size-4 shrink-0 animate-spin text-project-primary" />
      )}
    </div>
  );
};

export default DashboardFilter;
