"use client";

import { format } from "date-fns";
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
import AvailabilityPrompt from "@/src/features/dashboard/availability/dependencies/components/AvailabilityPrompt";
import { CHART_COLORS } from "@/src/lib/options/color.options";
import DashboardFilter from "../dependencies/components/DashboardFilter";
import { useTechnicianStatsQuery } from "../dependencies/hooks/useDashboard";
import { TREND_SERIES } from "@/src/lib/constant/constant";

const TechnicianOverviewPage = () => {
  const { data, isPending, isError, error, isFetching } =
    useTechnicianStatsQuery();

  return (
    <section>
      <AvailabilityPrompt />

      <div className="flex justify-between">
        <PageHeader
          title="Your overview"
          description="Earnings, job flow and rating for the selected period."
          divClassName="mb-6"
        />

        <DashboardFilter
          timePeriod={data?.timePeriod}
          isFetching={isFetching}
        />
      </div>

      {isPending && <DashboardSkeleton chartCount={2} />}

      {isError && <AppError message={error?.message} />}

      {data && !isError && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {data.stats.map((stat) => (
              <StatCard key={stat.id} {...stat} />
            ))}
          </div>

          {/* Two panels only, so the trend takes two thirds instead of leaving
              a half-empty row beside a single pie. */}
          <div className="grid gap-4 xl:grid-cols-3">
            <ChartCard title="Earnings trend" className="xl:col-span-2">
              <ChartLegend
                series={TREND_SERIES}
                colors={CHART_COLORS.earningsTrend}
                className="mb-5"
              />

              <GenericAreaChart
                data={data.charts.earningsTrend.map(
                  ({ date, current, previous }) => ({
                    label: format(new Date(`${date}T00:00:00`), "MMM d"),
                    current,
                    previous,
                  }),
                )}
                series={TREND_SERIES}
                colors={CHART_COLORS.earningsTrend}
                valuePrefix="৳"
              />
            </ChartCard>

            <ChartCard title="Jobs by status">
              <GenericPieChart
                data={data.charts.jobsByStatus.map(({ status, count }) => ({
                  name: status,
                  value: count,
                }))}
                colors={CHART_COLORS.jobsByStatus}
                centerLabel="Jobs"
                centerValue={data.charts.jobsByStatus
                  .reduce((sum, row) => sum + row.count, 0)
                  .toLocaleString()}
              />

              <ChartLegend
                series={data.charts.jobsByStatus.map(({ status, count }) => ({
                  id: status,
                  label: status.toLowerCase().replaceAll("_", " "),
                  total: count,
                }))}
                colors={CHART_COLORS.jobsByStatus}
                className="mt-5 justify-center"
              />
            </ChartCard>
          </div>
        </div>
      )}
    </section>
  );
};

export default TechnicianOverviewPage;
