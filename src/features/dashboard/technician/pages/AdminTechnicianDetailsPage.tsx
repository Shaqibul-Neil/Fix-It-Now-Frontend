"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  AppButton,
  AppError,
  AppRating,
  ChartLegend,
  DetailsSection,
  DetailsSkeleton,
  GenericPieChart,
  InfoList,
  PaginatedTable,
  ProfileHero,
  ReviewList,
  ScheduleBoard,
  StatusPill,
} from "@/src/components";
import {
  DAY_LABEL,
  DAY_ORDER,
  formatRange,
  toPublicWeekSchedule,
} from "@/src/features/dashboard/availability/dependencies/utils/availability.utils";
import { useAccountActions } from "@/src/features/dashboard/user/dependencies/table/useAccountActions";
import { CHART_COLORS } from "@/src/lib/options/color.options";
import { formatDate, formatMoney } from "@/src/lib/utils/format.utils";
import TechnicianApprovalModal from "../dependencies/components/TechnicianApprovalModal";
import { useAdminTechnicianDetailsQuery } from "../dependencies/hooks/useTechnicianQuery";
import { technicianServiceColumns } from "../dependencies/table/TechnicianServiceColumns";
import type {
  IAdminTechnicianDetails,
  ITechnicianApprovalTarget,
} from "../dependencies/types/technician.types";

const SERVICES_PAGE_SIZE = 5;

const SUBTITLE_LABEL =
  "mr-2 text-[11px] uppercase tracking-[0.14em] text-project-primary";

const AdminTechnicianDetailsPage = ({ id }: { id: string }) => {
  const { data, isPending, isError, error } =
    useAdminTechnicianDetailsQuery(id);
  const [reviewTarget, setReviewTarget] =
    useState<ITechnicianApprovalTarget | null>(null);

  // The embedded service list arrives whole, so this table pages over it here
  // rather than asking the server for a slice it does not serve.
  const [servicePage, setServicePage] = useState(1);
  const [servicePageSize, setServicePageSize] = useState(SERVICES_PAGE_SIZE);

  const account = useAccountActions<IAdminTechnicianDetails>(
    (row) => ({
      userId: row.userId,
      name: `${row.firstName} ${row.lastName}`,
      status: row.accountStatus,
      isDeleted: row.isDeleted,
    }),
    "technician",
  );

  if (isPending) return <DetailsSkeleton />;
  if (isError || !data) return <AppError message={error?.message} />;

  const fullName = `${data.firstName} ${data.lastName}`;
  const week = toPublicWeekSchedule(data.availability);
  const totalBookings = data.bookingsByStatus.reduce(
    (sum, entry) => sum + entry.count,
    0,
  );

  const serviceStart = (servicePage - 1) * servicePageSize;

  const isAwaitingDecision =
    data.approvalStatus === "PENDING" && !data.isDeleted;

  const reviewButton = (
    <AppButton
      text="Review application"
      rightIcon={ShieldCheck}
      onClick={() =>
        setReviewTarget({
          id: data.id,
          name: fullName,
          approvalStatus: data.approvalStatus,
        })
      }
    />
  );

  return (
    <section className="flex flex-col gap-4">
      <ProfileHero
        eyebrow="Technician"
        name={fullName}
        avatar={data.avatar}
        subtitle={
          // Three unlabelled strings in a row read as one sentence — each value
          // says which field it is.
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <AppRating
              value={Number(data.averageRating)}
              readOnly
              size={14}
              caption={`${data.averageRating} (${data.totalReviews} reviews)`}
            />

            <span className="min-w-0">
              <span className={SUBTITLE_LABEL}>Location</span>
              {`${data.area}, ${data.city}`}
            </span>

            <span className="min-w-0">
              <span className={SUBTITLE_LABEL}>Email</span>
              {data.email}
            </span>

            <span className="min-w-0">
              <span className={SUBTITLE_LABEL}>Phone</span>
              {data.phone}
            </span>
          </div>
        }
        badges={
          <>
            <StatusPill status={data.approvalStatus} />
            <StatusPill
              status={data.isDeleted ? "DELETED" : data.accountStatus}
            />
          </>
        }
        stats={[
          { label: "Experience", value: `${data.experienceYears} yrs` },
          { label: "Hourly rate", value: `${formatMoney(data.hourlyRate)}/hr` },
          { label: "Services", value: data.services.length },
          { label: "Bookings", value: totalBookings },
        ]}
        actions={
          // A pending application is the only decision on the table — banning
          // or removing an account nobody has ruled on yet is the wrong move,
          // so those come back once it is approved or rejected.
          isAwaitingDecision ? (
            reviewButton
          ) : (
            <>
              {/* An approved application is closed — from there the account is
                  banned, not re-decided. */}
              {!data.isDeleted &&
                data.approvalStatus === "REJECTED" &&
                reviewButton}

              {account.actions
                .filter((action) => !action.hidden?.(data))
                .map((action) => (
                  <AppButton
                    key={action.label}
                    text={action.label ?? ""}
                    rightIcon={action.icon}
                    variant={
                      action.variant === "destructive"
                        ? "destructiveOutline"
                        : "outline"
                    }
                    onClick={() => action.onClick(data)}
                  />
                ))}
            </>
          )
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <DetailsSection title="Profile">
            <InfoList
              columns={3}
              items={[
                {
                  label: "Bio",
                  // Paragraphs from the API — the blank line between them is
                  // what makes it read as a write-up and not one long line.
                  value: data.bio.join("\n\n"),
                  className: "sm:col-span-2 lg:col-span-3 whitespace-pre-line",
                },
                { label: "Phone", value: data.phone },
                { label: "Email", value: data.email },
                {
                  label: "Service radius",
                  value: data.serviceRadius ? `${data.serviceRadius} km` : null,
                },
                { label: "City", value: data.city },
                { label: "Area", value: data.area },
                { label: "Applied", value: formatDate(data.appliedAt) },
                {
                  label: "Reviewed",
                  value: data.reviewedAt ? formatDate(data.reviewedAt) : null,
                },
                { label: "Account id", value: data.userId },
                {
                  label: "Rejection reason",
                  value: data.rejectionReason,
                  className: "sm:col-span-2 lg:col-span-3",
                },
              ]}
            />
          </DetailsSection>

          <DetailsSection
            title="Services"
            description="Every listing on this profile, removed ones included."
          >
            <PaginatedTable
              data={data.services.slice(
                serviceStart,
                serviceStart + servicePageSize,
              )}
              columns={technicianServiceColumns}
              total={data.services.length}
              page={servicePage}
              pageSize={servicePageSize}
              onPageChange={setServicePage}
              onPageSizeChange={(size) => {
                setServicePageSize(size);
                setServicePage(1);
              }}
              emptyMessage="No service listed yet."
            />
          </DetailsSection>

          <DetailsSection
            title="Reviews"
            description="The five most recent published reviews."
            action={
              <AppButton
                variant="outline"
                text="Open in moderation"
                href={`/dashboard/admin/reviews?search=${encodeURIComponent(data.email)}`}
              />
            }
          >
            <ReviewList
              entries={data.reviews.map((review) => ({
                id: review.id,
                rating: review.rating,
                comment: review.comment.join("\n\n"),
                createdAt: review.createdAt,
                author: review.customer.name,
                authorAvatar: review.customer.avatar,
                subject: review.service.title,
              }))}
              emptyMessage="No published review yet."
            />
          </DetailsSection>
        </div>

        <div className="flex flex-col gap-4">
          <DetailsSection title="Bookings" className="h-fit">
            <GenericPieChart
              data={data.bookingsByStatus.map(({ status, count }) => ({
                name: status,
                value: count,
              }))}
              colors={CHART_COLORS.bookingsByStatus}
              centerLabel="Bookings"
              centerValue={totalBookings.toLocaleString()}
            />

            <ChartLegend
              series={data.bookingsByStatus.map(({ status, count }) => ({
                id: status,
                label: status.toLowerCase().replaceAll("_", " "),
                total: count,
              }))}
              colors={CHART_COLORS.bookingsByStatus}
              className="mt-5 justify-center"
            />
          </DetailsSection>

          <DetailsSection
            title="Availability"
            description="The week a customer sees when booking this technician."
            className="h-fit"
          >
            <ScheduleBoard
              days={DAY_ORDER.map((day) => ({
                id: day,
                label: DAY_LABEL[day],
                ranges: week[day].isActive
                  ? week[day].ranges.map(formatRange)
                  : [],
              }))}
            />
          </DetailsSection>
        </div>
      </div>

      <TechnicianApprovalModal
        target={reviewTarget}
        onClose={() => setReviewTarget(null)}
      />

      {account.modals}
    </section>
  );
};

export default AdminTechnicianDetailsPage;
