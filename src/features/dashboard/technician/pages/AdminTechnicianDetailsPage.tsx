"use client";

import { useState } from "react";
import {
  Briefcase,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  StarOff,
} from "lucide-react";
import {
  AppButton,
  AppError,
  AppSlider,
  ChartLegend,
  DetailsSection,
  DetailsSkeleton,
  GenericPieChart,
  InfoList,
  PaginatedTable,
  ProfileBanner,
  ProfileChips,
  ReviewCard,
  ScheduleBoard,
  StatusPill,
  Text,
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
import { useUpdateFeaturedMutation } from "../dependencies/hooks/useTechnicianMutation";
import { useAdminTechnicianDetailsQuery } from "../dependencies/hooks/useTechnicianQuery";
import { technicianServiceColumns } from "../dependencies/table/TechnicianServiceColumns";
import type {
  IAdminTechnicianDetails,
  ITechnicianApprovalTarget,
} from "../dependencies/types/technician.types";

const SERVICES_PAGE_SIZE = 5;

const AdminTechnicianDetailsPage = ({ id }: { id: string }) => {
  const { data, isPending, isError, error } = useAdminTechnicianDetailsQuery(id);
  const [reviewTarget, setReviewTarget] =
    useState<ITechnicianApprovalTarget | null>(null);
  const { mutate: updateFeatured, isPending: isFeaturing } =
    useUpdateFeaturedMutation();

  // The embedded service list arrives whole, so this table pages over it here.
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
      <ProfileBanner
        eyebrow="Technician"
        name={fullName}
        title={data.professionalTitle}
        avatar={data.avatar}
        coverImage={data.coverImage}
        badges={
          <>
            <StatusPill status={data.approvalStatus} />
            <StatusPill
              status={data.isDeleted ? "DELETED" : data.accountStatus}
            />
            {data.isFeatured && <StatusPill status="FEATURED" />}
          </>
        }
        metaItems={[
          {
            icon: Star,
            label: "Rating",
            value: `${data.averageRating} (${data.totalReviews} reviews)`,
          },
          {
            icon: Briefcase,
            label: "Experience",
            value: `${data.experienceYears} years experience`,
          },
          {
            icon: MapPin,
            label: "Location",
            value: `${data.area}, ${data.city}`,
          },
          { icon: Mail, label: "Email", value: data.email },
          { icon: Phone, label: "Phone", value: data.phone },
        ]}
        stats={[
          { label: "Hourly rate", value: `${formatMoney(data.hourlyRate)}/hr` },
          { label: "Services", value: data.services.length },
          { label: "Bookings", value: totalBookings },
          {
            label: "Accepting work",
            value: data.isAvailable ? "Yes" : "Paused",
          },
        ]}
        actions={
          // A pending application is the only decision on the table.
          isAwaitingDecision ? (
            reviewButton
          ) : (
            <>
              {!data.isDeleted &&
                data.approvalStatus === "REJECTED" &&
                reviewButton}

              {!data.isDeleted && data.approvalStatus === "APPROVED" && (
                <AppButton
                  text={
                    data.isFeatured ? "Remove from home" : "Feature on home"
                  }
                  rightIcon={data.isFeatured ? StarOff : Star}
                  variant={data.isFeatured ? "outline" : "noOutline"}
                  disabled={isFeaturing}
                  onClick={() =>
                    updateFeatured({
                      id: data.id,
                      isFeatured: !data.isFeatured,
                    })
                  }
                />
              )}

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

      <div className="grid min-w-0 gap-4 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">
          <DetailsSection title="Background">
            {data.tagline && (
              <blockquote className="mb-5 border-l-2 border-project-primary bg-project-muted/40 px-5 py-4">
                <Text
                  variant="normal-base"
                  as="p"
                  className="italic text-project-muted-foreground"
                >
                  “{data.tagline}”
                </Text>
              </blockquote>
            )}

            {data.bio.length === 0 ? (
              <Text
                variant="normal-sm"
                as="p"
                className="text-project-muted-foreground"
              >
                No bio written yet.
              </Text>
            ) : (
              <div className="space-y-4">
                {data.bio.map((paragraph) => (
                  <Text
                    key={paragraph}
                    variant="normal-sm"
                    as="p"
                    className="leading-relaxed text-project-foreground"
                  >
                    {paragraph}
                  </Text>
                ))}
              </div>
            )}
          </DetailsSection>

          <DetailsSection
            title="Identity"
            description="Vetting details, admin only."
          >
            <InfoList
              columns={3}
              items={[
                { label: "National ID", value: data.identity.nationalId },
                {
                  label: "Date of birth",
                  value: data.identity.dateOfBirth
                    ? formatDate(data.identity.dateOfBirth)
                    : null,
                },
                { label: "Passport", value: data.identity.passportNumber },
                {
                  label: "Emergency contact",
                  value: data.identity.emergencyContactName,
                },
                {
                  label: "Emergency phone",
                  value: data.identity.emergencyContactPhone,
                },
                {
                  label: "NID document",
                  value: data.identity.nidDocument ? (
                    <a
                      href={data.identity.nidDocument}
                      target="_blank"
                      rel="noreferrer"
                      className="text-project-primary hover:underline"
                    >
                      Open document
                    </a>
                  ) : null,
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
            {data.reviews.length === 0 ? (
              <Text
                variant="normal-sm"
                as="p"
                className="text-project-muted-foreground"
              >
                No published review yet.
              </Text>
            ) : (
              <AppSlider
                label={`Reviews for ${fullName}`}
                bullets={false}
                controlsLabel="Latest reviews"
                controlsAlign="between"
                spaceBetween={16}
                breakpoints={{ 768: { slidesPerView: 2 } }}
                controlsClassName="mt-6"
              >
                {data.reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    entry={{
                      id: review.id,
                      rating: review.rating,
                      comment: review.comment.join("\n\n"),
                      createdAt: review.createdAt,
                      author: review.customer.name,
                      authorAvatar: review.customer.avatar,
                      subject: review.service.title,
                    }}
                  />
                ))}
              </AppSlider>
            )}
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

          <DetailsSection title="Application" className="h-fit">
            <InfoList
              columns={1}
              items={[
                { label: "Address", value: data.address },
                {
                  label: "Service radius",
                  value: data.serviceRadius ? `${data.serviceRadius} km` : null,
                },
                {
                  label: "Emergency jobs",
                  value: data.offersEmergencyService ? "Accepted" : "No",
                },
                { label: "Applied", value: formatDate(data.appliedAt) },
                {
                  label: "Reviewed",
                  value: data.reviewedAt ? formatDate(data.reviewedAt) : null,
                },
                { label: "Account id", value: data.userId },
                { label: "Rejection reason", value: data.rejectionReason },
              ]}
            />
          </DetailsSection>

          <DetailsSection title="Specialties" className="h-fit">
            <ProfileChips
              items={data.skills}
              emptyMessage="No skill listed yet."
            />
          </DetailsSection>

          <DetailsSection title="How they work" className="h-fit">
            <ProfileChips
              items={data.workHighlights}
              variant="check"
              emptyMessage="No highlight listed yet."
              className="sm:grid-cols-1"
            />
          </DetailsSection>
        </div>
      </div>

      <DetailsSection
        title="Availability"
        description="The week a customer sees when booking this technician."
      >
        <ScheduleBoard
          days={DAY_ORDER.map((day) => ({
            id: day,
            label: DAY_LABEL[day],
            ranges: week[day].isActive
              ? week[day].ranges.map(formatRange)
              : [],
          }))}
          className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7"
        />
      </DetailsSection>

      <TechnicianApprovalModal
        target={reviewTarget}
        onClose={() => setReviewTarget(null)}
      />

      {account.modals}
    </section>
  );
};

export default AdminTechnicianDetailsPage;
