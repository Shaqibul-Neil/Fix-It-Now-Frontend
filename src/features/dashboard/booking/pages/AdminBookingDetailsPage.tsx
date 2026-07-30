"use client";

import {
  AppError,
  DetailsHeader,
  DetailsSection,
  DetailsSkeleton,
  InfoList,
  StatusPill,
  StatusTimeline,
} from "@/src/components";
import {
  formatDate,
  formatDateTime,
  formatMoney,
} from "@/src/lib/utils/format.utils";
import { useAdminBookingDetailsQuery } from "../dependencies/hooks/useBookingQuery";

const AdminBookingDetailsPage = ({ id }: { id: string }) => {
  const { data, isPending, isError, error } = useAdminBookingDetailsQuery(id);

  if (isPending) return <DetailsSkeleton />;
  if (isError || !data) return <AppError message={error?.message} />;

  const { customer, technician, service } = data;

  return (
    <section className="space-y-4">
      <DetailsHeader
        title="Booking"
        name={service.title}
        status={<StatusPill status={data.status} />}
        metaItems={[
          { label: "Reference", value: data.id },
          { label: "Category", value: data.categoryName },
          { label: "Amount", value: formatMoney(data.amount) },
          { label: "Scheduled", value: formatDateTime(data.scheduledAt) },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <DetailsSection title="Job">
            <InfoList
              columns={3}
              items={[
                { label: "Service", value: service.title },
                { label: "Listed price", value: formatMoney(service.price) },
                {
                  label: "Estimated duration",
                  value: service.estimatedDuration
                    ? `${service.estimatedDuration} min`
                    : null,
                },
                { label: "Charged amount", value: formatMoney(data.amount) },
                {
                  label: "Service active",
                  value: service.isActive ? "Yes" : "No",
                },
                { label: "Category", value: data.categoryName },
                {
                  label: "Description",
                  value: service.description,
                  className: "sm:col-span-2 lg:col-span-3",
                },
              ]}
            />
          </DetailsSection>

          <DetailsSection title="Customer">
            <InfoList
              columns={3}
              items={[
                {
                  label: "Name",
                  value: `${customer.users.firstName} ${customer.users.lastName}`,
                },
                { label: "Email", value: customer.users.email },
                { label: "Phone", value: customer.phone },
                { label: "City", value: customer.city },
                { label: "Area", value: customer.area },
                { label: "Default address", value: customer.defaultAddress },
              ]}
            />
          </DetailsSection>

          <DetailsSection title="Technician">
            <InfoList
              columns={3}
              items={[
                {
                  label: "Name",
                  value: `${technician.users.firstName} ${technician.users.lastName}`,
                },
                { label: "Email", value: technician.users.email },
                { label: "Phone", value: technician.phone },
                { label: "City", value: technician.city },
                { label: "Area", value: technician.area },
                {
                  label: "Experience",
                  value: `${technician.experienceYears} yrs`,
                },
                {
                  label: "Hourly rate",
                  value: formatMoney(technician.hourlyRate),
                },
                {
                  label: "Rating",
                  value: `${technician.averageRating} (${technician.totalReviews})`,
                },
              ]}
            />
          </DetailsSection>

          <DetailsSection title="Where and when">
            <InfoList
              columns={3}
              items={[
                {
                  label: "Address",
                  value: data.address,
                  className: "sm:col-span-2 lg:col-span-3",
                },
                { label: "City", value: data.city },
                { label: "Area", value: data.area },
                { label: "Scheduled", value: formatDateTime(data.scheduledAt) },
                { label: "Placed", value: formatDateTime(data.createdAt) },
                {
                  label: "Accepted",
                  value: data.acceptedAt
                    ? formatDateTime(data.acceptedAt)
                    : null,
                },
                {
                  label: "Completed",
                  value: data.completedAt
                    ? formatDateTime(data.completedAt)
                    : null,
                },
                {
                  label: "Cancelled",
                  value: data.cancelledAt ? formatDate(data.cancelledAt) : null,
                },
                {
                  label: "Notes",
                  value: data.notes,
                  className: "sm:col-span-2 lg:col-span-3",
                },
              ]}
            />
          </DetailsSection>
        </div>

        <DetailsSection title="Timeline" className="h-fit">
          <StatusTimeline
            entries={data.statusHistory.map((entry, index) => ({
              key: `${entry.status}-${index}`,
              status: <StatusPill status={entry.status} />,
              note: entry.note,
              createdAt: entry.createdAt,
            }))}
          />
        </DetailsSection>
      </div>
    </section>
  );
};

export default AdminBookingDetailsPage;
