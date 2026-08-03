"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  AppAvatar,
  AppButton,
  AppError,
  ChartCard,
  ChartLegend,
  DashboardSkeleton,
  GenericPieChart,
  PageHeader,
  StatCard,
  StatusPill,
  StatusStepper,
  Text,
} from "@/src/components";
import type { TStatus } from "@/src/components/common/buttons/StatusPill";
import { mapPaletteTo } from "@/src/lib/options/color.options";
import { formatDate } from "@/src/lib/utils/format.utils";
import { useCustomerStatsQuery } from "../dependencies/hooks/useDashboard";
import type { TMaintenanceStatus } from "../dependencies/types/dashboard.types";

// What each card says under its number. The href itself comes from the API.
const STAT_LINK_TEXT: Record<string, string> = {
  active_bookings: "View bookings",
  pending_reviews: "Write a review",
  completed_jobs: "View history",
  your_technicians: "View all",
  maintenance_due: "See what is due",
};

// The four statuses a booking passes through while it is still open, plus the
// one it lands on. Index in this list is how far along the stepper sits.
const BOOKING_STEPS = [
  { key: "REQUESTED", label: "Requested" },
  { key: "ACCEPTED", label: "Accepted" },
  { key: "PAID", label: "Paid" },
  { key: "IN_PROGRESS", label: "On the way" },
  { key: "COMPLETED", label: "Done" },
];

// "never" is not a state to report — it gets a button instead, so the row
// offers the customer something to do rather than a label.
const MAINTENANCE_PILL: Record<Exclude<TMaintenanceStatus, "never">, TStatus> = {
  due: "DUE",
  soon: "DUE_SOON",
  ok: "ON_TRACK",
};

const CustomerOverviewPage = () => {
  const { data, isPending, isError, error } = useCustomerStatsQuery();

  const categoryColors = useMemo(
    () => mapPaletteTo(data?.serviceMix.map((row) => row.categoryName) ?? []),
    [data],
  );

  return (
    <section>
      <PageHeader
        title="Your home"
        description="What is booked, what is due, and who has worked here before."
        divClassName="mb-6"
      />

      {isPending && <DashboardSkeleton chartCount={2} />}

      {isError && <AppError message={error?.message} />}

      {data && !isError && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {data.stats.map((stat) => (
              <StatCard
                key={stat.id}
                {...stat}
                linkText={STAT_LINK_TEXT[stat.id]}
              />
            ))}
          </div>

          {/* One grid, so the DOM order is the phone order and xl:order puts the
              desktop reading order back. On a phone the live job comes first. */}
          <div className="grid gap-4 xl:grid-cols-5">
            <ChartCard
              title={`Active bookings — ${data.activeBooking.total}`}
              className="xl:order-4 xl:col-span-2"
            >
              {data.activeBooking.primary ? (
                <div className="space-y-5">
                  <div>
                    <Text
                      variant="semibold-base"
                      as="h3"
                      className="text-project-accent"
                    >
                      {`${data.activeBooking.primary.serviceTitle} · ${data.activeBooking.primary.technicianName}`}
                    </Text>

                    <Text
                      variant="normal-xs"
                      as="span"
                      className="mt-1.5 block text-project-muted-foreground"
                    >
                      {formatDate(data.activeBooking.primary.scheduledAt)}
                    </Text>
                  </div>

                  <StatusStepper
                    steps={BOOKING_STEPS}
                    currentIndex={BOOKING_STEPS.findIndex(
                      (step) => step.key === data.activeBooking.primary?.status,
                    )}
                  />

                  {/* Only the nearest job gets the stepper — the rest collapse to
                      a line each, so four live jobs cannot stretch the row. */}
                  {data.activeBooking.others.map((booking) => (
                    <Link
                      key={booking.id}
                      href={`/dashboard/customer/bookings/${booking.id}`}
                      className="grid grid-cols-[1fr_auto] items-center gap-3 border-t border-project-border pt-3"
                    >
                      <div className="min-w-0">
                        <Text
                          variant="medium-sm"
                          as="span"
                          truncate
                          className="block text-project-accent"
                        >
                          {`${booking.categoryName} · ${booking.technicianName}`}
                        </Text>

                        <Text
                          variant="normal-xs"
                          as="span"
                          className="mt-1.5 block text-project-muted-foreground"
                        >
                          {formatDate(booking.scheduledAt)}
                        </Text>
                      </div>

                      <StatusPill
                        status={booking.status}
                        className="justify-self-end"
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <Text
                  variant="normal-sm"
                  as="p"
                  className="text-project-muted-foreground"
                >
                  Nothing booked right now. Pick a service and a technician will
                  confirm a time.
                </Text>
              )}
            </ChartCard>

            <ChartCard
              id="maintenance"
              title="Home maintenance"
              className="scroll-mt-24 xl:order-1 xl:col-span-3"
            >
              {data.maintenance.length > 0 ? (
                <ul>
                  {data.maintenance.map((item) => (
                    <li
                      key={item.categoryId}
                      className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-project-border py-3 last:border-0 last:pb-0 sm:grid-cols-[1fr_auto_auto] sm:gap-6"
                    >
                      <Link
                        href={`/categories/${item.slug}`}
                        className="min-w-0 truncate text-sm font-medium text-project-accent transition-colors duration-300 hover:text-project-primary"
                      >
                        {item.name}
                      </Link>

                      <Text
                        variant="normal-xs"
                        as="span"
                        className="hidden whitespace-nowrap text-project-muted-foreground sm:block"
                      >
                        {item.lastServicedAt
                          ? `Last serviced ${formatDistanceToNow(new Date(item.lastServicedAt))} ago`
                          : "Never booked"}
                      </Text>

                      {item.status === "never" ? (
                        <AppButton
                          href={`/dashboard/customer/services?category=${item.slug}`}
                          text="Try it"
                          variant="noOutline"
                          rightIcon={ArrowUpRight}
                          className="h-7 justify-self-end px-3 text-xs"
                        />
                      ) : (
                        <StatusPill
                          status={MAINTENANCE_PILL[item.status]}
                          label={
                            item.status === "soon" && item.daysLeft
                              ? `${item.daysLeft} days`
                              : undefined
                          }
                          className="justify-self-end"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <Text
                  variant="normal-sm"
                  as="p"
                  className="text-project-muted-foreground"
                >
                  No maintenance needed right now. Nothing on your list is on a
                  repeat schedule yet.
                </Text>
              )}
            </ChartCard>

            <ChartCard
              title="Your technicians"
              className="xl:order-3 xl:col-span-3"
              action={
                data.technicians.total > data.technicians.items.length && (
                  <Link
                    href="/dashboard/customer/bookings?status=COMPLETED"
                    className="flex items-center gap-1 text-xs font-medium text-project-muted-foreground transition-colors duration-300 hover:text-project-primary"
                  >
                    {`View all ${data.technicians.total}`}
                    <ArrowUpRight className="size-3.5 shrink-0" />
                  </Link>
                )
              }
            >
              {data.technicians.items.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {data.technicians.items.map((technician) => (
                    <Link
                      key={technician.id}
                      href={`/technicians/${technician.id}`}
                      className="group flex items-start gap-3 border border-project-border p-3 transition-colors duration-300 hover:border-project-primary"
                    >
                      <AppAvatar
                        src={technician.avatar}
                        name={technician.name}
                        className="size-9"
                      />

                      <div className="min-w-0">
                        <Text
                          variant="medium-sm"
                          as="span"
                          truncate
                          className="block text-project-accent"
                        >
                          {technician.name}
                        </Text>

                        <Text
                          variant="normal-xs"
                          as="span"
                          className="mt-1.5 block text-project-muted-foreground"
                        >
                          {`${technician.jobsTogether} jobs · ${technician.yourRating ? `you rated ${technician.yourRating}` : "not rated"}`}
                        </Text>

                        <Text
                          variant="medium-xs"
                          as="span"
                          className="mt-2 inline-flex items-center gap-1 text-project-muted-foreground transition-colors duration-300 group-hover:text-project-primary"
                        >
                          Book again
                          <ArrowUpRight className="size-3 shrink-0" />
                        </Text>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Text
                  variant="normal-sm"
                  as="p"
                  className="text-project-muted-foreground"
                >
                  No technician has finished a job here yet. The first one you
                  book shows up on this list.
                </Text>
              )}
            </ChartCard>

            <ChartCard
              title="Services you use"
              className="xl:order-2 xl:col-span-2"
            >
              {data.serviceMix.length > 0 ? (
                <>
                  <GenericPieChart
                    data={data.serviceMix.map(({ categoryName, count }) => ({
                      name: categoryName,
                      value: count,
                    }))}
                    colors={categoryColors}
                    centerLabel="Jobs"
                    centerValue={data.serviceMix
                      .reduce((sum, row) => sum + row.count, 0)
                      .toLocaleString()}
                  />

                  <ChartLegend
                    series={data.serviceMix.map(({ categoryName, count }) => ({
                      id: categoryName,
                      label: categoryName,
                      total: count,
                    }))}
                    colors={categoryColors}
                    className="mt-5 justify-center"
                  />
                </>
              ) : (
                <Text
                  variant="normal-sm"
                  as="p"
                  className="text-project-muted-foreground"
                >
                  Nothing to chart yet. Once a job is finished it lands here.
                </Text>
              )}
            </ChartCard>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerOverviewPage;
