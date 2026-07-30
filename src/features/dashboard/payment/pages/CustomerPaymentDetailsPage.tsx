"use client";

import { ClipboardList } from "lucide-react";
import {
  AppButton,
  AppError,
  DetailsHeader,
  DetailsSection,
  DetailsSkeleton,
  InfoList,
  StatusPill,
} from "@/src/components";
import { formatDateTime, formatMoney } from "@/src/lib/utils/format.utils";
import { useCustomerPaymentDetailsQuery } from "../dependencies/hooks/usePaymentQuery";

const CustomerPaymentDetailsPage = ({ id }: { id: string }) => {
  const { data, isPending, isError, error } = useCustomerPaymentDetailsQuery(id);

  if (isPending) return <DetailsSkeleton sectionCount={3} />;
  if (isError || !data) return <AppError message={error?.message} />;

  const { booking, service, technician } = data;

  return (
    <section className="space-y-4">
      <DetailsHeader
        title="Receipt"
        name={service.title}
        status={<StatusPill status={data.status} />}
        metaItems={[
          { label: "Amount", value: `${formatMoney(data.amount)}` },
          { label: "Technician", value: technician.name },
          {
            label: "Paid on",
            value: data.paidAt ? formatDateTime(data.paidAt) : "—",
          },
        ]}
        renderActions={
          <AppButton
            variant="outline"
            text="View booking"
            rightIcon={ClipboardList}
            href={`/dashboard/customer/bookings/${booking.id}`}
          />
        }
      />

      <DetailsSection title="Payment">
        <InfoList
          columns={3}
          items={[
            { label: "Amount", value: formatMoney(data.amount) },
            { label: "Currency", value: data.currency },
            { label: "Gateway", value: data.provider },
            { label: "Method", value: data.method },
            {
              label: "Reference",
              value: data.transactionId,
              className: "sm:col-span-2 lg:col-span-2",
            },
            { label: "Started", value: formatDateTime(data.createdAt) },
            {
              label: "Paid on",
              value: data.paidAt ? formatDateTime(data.paidAt) : null,
            },
            { label: "Last updated", value: formatDateTime(data.updatedAt) },
          ]}
        />
      </DetailsSection>

      <DetailsSection title="What you paid for">
        <InfoList
          columns={3}
          items={[
            { label: "Service", value: service.title },
            { label: "Category", value: service.category },
            { label: "Listed price", value: formatMoney(service.price) },
            { label: "Technician", value: technician.name },
          ]}
        />
      </DetailsSection>

      <DetailsSection
        title="Booking"
        action={<StatusPill status={booking.status} />}
      >
        <InfoList
          columns={3}
          items={[
            {
              label: "Address",
              value: booking.address,
              className: "sm:col-span-2 lg:col-span-3",
            },
            { label: "City", value: booking.city },
            { label: "Area", value: booking.area },
            { label: "Scheduled", value: formatDateTime(booking.scheduledAt) },
            {
              label: "Accepted",
              value: booking.acceptedAt
                ? formatDateTime(booking.acceptedAt)
                : null,
            },
            {
              label: "Completed",
              value: booking.completedAt
                ? formatDateTime(booking.completedAt)
                : null,
            },
            {
              label: "Cancelled",
              value: booking.cancelledAt
                ? formatDateTime(booking.cancelledAt)
                : null,
            },
            {
              label: "Your notes",
              value: booking.notes,
              className: "sm:col-span-2 lg:col-span-3",
            },
          ]}
        />
      </DetailsSection>
    </section>
  );
};

export default CustomerPaymentDetailsPage;
