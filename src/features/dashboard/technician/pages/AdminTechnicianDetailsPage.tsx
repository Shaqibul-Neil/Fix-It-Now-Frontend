"use client";

import { useState } from "react";
import {
  AppButton,
  AppError,
  AppRating,
  DetailsHeader,
  DetailsSection,
  DetailsSkeleton,
  InfoList,
  StatusPill,
  Text,
} from "@/src/components";
import AvailabilitySummary from "@/src/features/dashboard/availability/dependencies/components/AvailabilitySummary";
import { toPublicWeekSchedule } from "@/src/features/dashboard/availability/dependencies/utils/availability.utils";
import { formatDate, formatMoney } from "@/src/lib/utils/format.utils";
import TechnicianApprovalModal from "../dependencies/components/TechnicianApprovalModal";
import { useAdminTechnicianDetailsQuery } from "../dependencies/hooks/useTechnicianQuery";
import type { ITechnicianApprovalTarget } from "../dependencies/types/technician.types";

const AdminTechnicianDetailsPage = ({ id }: { id: string }) => {
  const { data, isPending, isError, error } =
    useAdminTechnicianDetailsQuery(id);
  const [reviewTarget, setReviewTarget] =
    useState<ITechnicianApprovalTarget | null>(null);

  if (isPending) return <DetailsSkeleton />;
  if (isError || !data) return <AppError message={error?.message} />;

  const fullName = `${data.firstName} ${data.lastName}`;
  const week = toPublicWeekSchedule(data.availability);

  return (
    <section className="space-y-4">
      <DetailsHeader
        title="Technician"
        name={fullName}
        status={<StatusPill status={data.approvalStatus} />}
        metaItems={[
          { label: "Location", value: `${data.city}, ${data.area}` },
          { label: "Experience", value: `${data.experienceYears} yrs` },
          { label: "Rate", value: `${formatMoney(data.hourlyRate)}/hr` },
          {
            label: "Rating",
            value: `${data.averageRating} (${data.totalReviews})`,
          },
        ]}
        renderActions={
          <AppButton
            text="Review application"
            onClick={() =>
              setReviewTarget({
                id: data.id,
                name: fullName,
                approvalStatus: data.approvalStatus,
              })
            }
          />
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <DetailsSection title="Profile">
            <InfoList
              columns={3}
              items={[
                {
                  label: "Bio",
                  value: data.bio,
                  className: "sm:col-span-2 lg:col-span-3",
                },
                {
                  label: "Service radius",
                  value: data.serviceRadius ? `${data.serviceRadius} km` : null,
                },
                { label: "City", value: data.city },
                { label: "Area", value: data.area },
                {
                  label: "Rejection reason",
                  value: data.rejectionReason,
                  className: "sm:col-span-2 lg:col-span-3",
                },
                { label: "Profile id", value: data.id },
              ]}
            />
          </DetailsSection>

          <DetailsSection title="Services offered">
            {data.services.length === 0 ? (
              <Text
                variant="normal-sm"
                as="p"
                className="text-project-muted-foreground"
              >
                No active service listed yet.
              </Text>
            ) : (
              <ul className="divide-y divide-project-border">
                {data.services.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <span className="block truncate font-medium">
                        {service.title}
                      </span>

                      <Text
                        variant="normal-xs"
                        as="span"
                        className="block truncate text-project-muted-foreground"
                      >
                        {service.category}
                      </Text>
                    </div>

                    <span className="shrink-0 font-semibold text-project-accent">
                      {formatMoney(service.price)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </DetailsSection>

          <DetailsSection title="Recent reviews">
            {data.reviews.length === 0 ? (
              <Text
                variant="normal-sm"
                as="p"
                className="text-project-muted-foreground"
              >
                No published review yet.
              </Text>
            ) : (
              <ul className="divide-y divide-project-border">
                {data.reviews.map((review) => (
                  <li
                    key={review.id}
                    className="space-y-2 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <AppRating value={review.rating} readOnly size={13} />

                      <Text
                        variant="normal-xs"
                        as="span"
                        className="text-project-muted-foreground"
                      >
                        {formatDate(review.createdAt)}
                      </Text>
                    </div>

                    {review.comment && (
                      <Text variant="normal-sm" as="p">
                        {review.comment}
                      </Text>
                    )}

                    <Text
                      variant="normal-xs"
                      as="span"
                      className="block text-project-muted-foreground"
                    >
                      {review.customer.name} · {review.service.title}
                    </Text>
                  </li>
                ))}
              </ul>
            )}
          </DetailsSection>
        </div>

        <div className="space-y-4">
          <DetailsSection title="Bookings" className="h-fit">
            <ul className="space-y-2.5">
              {data.bookingsByStatus.map((entry) => (
                <li
                  key={entry.status}
                  className="flex items-center justify-between gap-3"
                >
                  <StatusPill status={entry.status} />

                  <span className="font-semibold tabular-nums">
                    {entry.count}
                  </span>
                </li>
              ))}
            </ul>
          </DetailsSection>

          <DetailsSection title="Availability" className="h-fit">
            <AvailabilitySummary week={week} />
          </DetailsSection>
        </div>
      </div>

      <TechnicianApprovalModal
        target={reviewTarget}
        onClose={() => setReviewTarget(null)}
      />
    </section>
  );
};

export default AdminTechnicianDetailsPage;
