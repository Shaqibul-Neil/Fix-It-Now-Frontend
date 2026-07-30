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
import { useAdminPaymentDetailsQuery } from "../dependencies/hooks/usePaymentQuery";

const AdminPaymentDetailsPage = ({ id }: { id: string }) => {
  const { data, isPending, isError, error } = useAdminPaymentDetailsQuery(id);

  if (isPending) return <DetailsSkeleton sectionCount={4} />;
  if (isError || !data) return <AppError message={error?.message} />;

  const { booking, service, technician, customer } = data;

  return (
    <section className="space-y-4">
      <DetailsHeader
        title="Transaction"
        name={service.title}
        status={<StatusPill status={data.status} />}
        metaItems={[
          { label: "Amount", value: formatMoney(data.amount) },
          { label: "Payer", value: customer.name },
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
            href={`/dashboard/admin/bookings/${booking.id}`}
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
            { label: "Started", value: formatDateTime(data.createdAt) },
            { label: "Last updated", value: formatDateTime(data.updatedAt) },
            {
              label: "Transaction id",
              value: data.transactionId,
              className: "sm:col-span-2 lg:col-span-2",
            },
            { label: "Validation id", value: data.valId },
          ]}
        />
      </DetailsSection>

      <DetailsSection title="Payer">
        <InfoList
          columns={3}
          items={[
            { label: "Name", value: customer.name },
            { label: "Email", value: customer.email },
            { label: "Phone", value: customer.phone },
          ]}
        />
      </DetailsSection>

      <DetailsSection title="Job">
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
              label: "Customer notes",
              value: booking.notes,
              className: "sm:col-span-2 lg:col-span-3",
            },
          ]}
        />
      </DetailsSection>
    </section>
  );
};

export default AdminPaymentDetailsPage;
