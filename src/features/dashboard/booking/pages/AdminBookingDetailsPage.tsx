"use client";

import {
  AppAvatar,
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
  const customerName = `${customer.users.firstName} ${customer.users.lastName}`;
  const technicianName = `${technician.users.firstName} ${technician.users.lastName}`;

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
                { label: "Charged amount", value: formatMoney(data.amount) },
                { label: "Category", value: service.category.name },
                {
                  label: "Listing",
                  value: (
                    <StatusPill
                      status={
                        service.deletedAt
                          ? "DELETED"
                          : service.isActive
                            ? "ACTIVE"
                            : "PAUSED"
                      }
                    />
                  ),
                },
                { label: "Service id", value: service.id },
              ]}
            />
          </DetailsSection>

          <DetailsSection
            title="Customer information"
            action={
              // Negative margin keeps the header the same height it was before
              // an avatar sat in it.
              <AppAvatar
                src={customer.avatar}
                name={customerName}
                className="size-10 lg:-my-2"
              />
            }
          >
            <InfoList
              columns={2}
              items={[
                { label: "Name", value: customerName },
                { label: "Email", value: customer.users.email },
                { label: "Phone", value: customer.phone },
                { label: "Account id", value: customer.users.id },
              ]}
            />
          </DetailsSection>

          <DetailsSection
            title="Technician information"
            action={
              <AppAvatar
                src={technician.avatar}
                name={technicianName}
                className="size-10 lg:-my-2"
              />
            }
          >
            <InfoList
              columns={2}
              items={[
                { label: "Name", value: technicianName },
                { label: "Email", value: technician.users.email },
                { label: "Phone", value: technician.phone },
                { label: "Account id", value: technician.users.id },
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
