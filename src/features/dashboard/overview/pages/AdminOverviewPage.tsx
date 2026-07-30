"use client";

import { format } from "date-fns";
import { useMemo } from "react";
import {
  AppError,
  ChartCard,
  ChartLegend,
  DashboardSkeleton,
  GenericAreaChart,
  GenericPieChart,
  PageHeader,
  StatCard,
} from "@/src/components";
import { CHART_COLORS, mapPaletteTo } from "@/src/lib/options/color.options";

import DashboardFilter from "../dependencies/components/DashboardFilter";
import { useAdminStatsQuery } from "../dependencies/hooks/useDashboard";
import { TREND_SERIES } from "@/src/lib/constant/constant";

const AdminOverviewPage = () => {
  const { data, isPending, isError, error, isFetching } = useAdminStatsQuery();

  const categoryColors = useMemo(
    () =>
      mapPaletteTo(
        data?.charts.bookingByCategory.map((row) => row.category) ?? [],
      ),
    [data],
  );

  return (
    <section>
      <div className="flex justify-between">
        <PageHeader
          title="Platform overview"
          description="Revenue, bookings and category demand for the selected period."
          divClassName="mb-6"
        />
        <DashboardFilter
          timePeriod={data?.timePeriod}
          isFetching={isFetching}
        />
      </div>

      {isPending && <DashboardSkeleton chartCount={3} />}

      {isError && <AppError message={error?.message} />}

      {data && !isError && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {data.stats.map((stat) => (
              <StatCard key={stat.id} {...stat} />
            ))}
          </div>

          <ChartCard title="Revenue trend">
            <ChartLegend
              series={TREND_SERIES}
              colors={CHART_COLORS.revenueTrend}
              className="mb-5"
            />

            <GenericAreaChart
              data={data.charts.revenueTrend.map(
                ({ date, current, previous }) => ({
                  label: format(new Date(`${date}T00:00:00`), "MMM d"),
                  current,
                  previous,
                }),
              )}
              series={TREND_SERIES}
              colors={CHART_COLORS.revenueTrend}
              valuePrefix="৳"
            />
          </ChartCard>

          <div className="grid gap-4 xl:grid-cols-2">
            <ChartCard title="Bookings by status">
              <GenericPieChart
                data={data.charts.bookingsByStatus.map(({ status, count }) => ({
                  name: status,
                  value: count,
                }))}
                colors={CHART_COLORS.bookingsByStatus}
                centerLabel="Bookings"
                centerValue={data.charts.bookingsByStatus
                  .reduce((sum, row) => sum + row.count, 0)
                  .toLocaleString()}
              />

              <ChartLegend
                series={data.charts.bookingsByStatus.map(
                  ({ status, count }) => ({
                    id: status,
                    label: status.toLowerCase().replaceAll("_", " "),
                    total: count,
                  }),
                )}
                colors={CHART_COLORS.bookingsByStatus}
                className="mt-5 justify-center"
              />
            </ChartCard>

            <ChartCard title="Bookings by category">
              <GenericPieChart
                data={data.charts.bookingByCategory.map(
                  ({ category, count }) => ({
                    name: category,
                    value: count,
                  }),
                )}
                colors={categoryColors}
                centerLabel="Bookings"
                centerValue={data.charts.bookingByCategory
                  .reduce((sum, row) => sum + row.count, 0)
                  .toLocaleString()}
              />

              <ChartLegend
                series={data.charts.bookingByCategory.map(
                  ({ category, count }) => ({
                    id: category,
                    label: category,
                    total: count,
                  }),
                )}
                colors={categoryColors}
                className="mt-5 justify-center"
              />
            </ChartCard>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminOverviewPage;
