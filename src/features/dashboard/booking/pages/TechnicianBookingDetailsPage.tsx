"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  AppButton,
  AppError,
  DetailsHeader,
  DetailsSection,
  DetailsSkeleton,
  InfoList,
  StatusPill,
  StatusTimeline,
  StatusUpdateModal,
} from "@/src/components";
import { formatDateTime, formatMoney } from "@/src/lib/utils/format.utils";
import { NEXT_STATUS } from "../dependencies/booking.rules";
import { useUpdateBookingStatusMutation } from "../dependencies/hooks/useBookingMutation";
import { useTechnicianBookingDetailsQuery } from "../dependencies/hooks/useBookingQuery";
import type { TBookingStatusUpdate } from "../dependencies/types/booking.types";

const TechnicianBookingDetailsPage = ({ id }: { id: string }) => {
  const { data, isPending, isError, error } =
    useTechnicianBookingDetailsQuery(id);
  const [isUpdating, setIsUpdating] = useState(false);
  const updateStatus = useUpdateBookingStatusMutation(() =>
    setIsUpdating(false),
  );

  if (isPending) return <DetailsSkeleton sectionCount={2} />;
  if (isError || !data) return <AppError message={error?.message} />;

  const { customer, service } = data;
  const nextOptions = NEXT_STATUS[data.status] ?? [];

  return (
    <section className="space-y-4">
      <DetailsHeader
        title="Job"
        name={service.title}
        status={<StatusPill status={data.status} />}
        metaItems={[
          { label: "Category", value: service.category.name },
          { label: "Amount", value: formatMoney(data.amount) },
          { label: "Scheduled", value: formatDateTime(data.scheduledAt) },
        ]}
        renderActions={
          nextOptions.length > 0 && (
            <AppButton
              text="Change status"
              rightIcon={RefreshCw}
              onClick={() => setIsUpdating(true)}
            />
          )
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <DetailsSection title="Customer">
            <InfoList
              items={[
                {
                  label: "Name",
                  value: `${customer.users.firstName} ${customer.users.lastName}`,
                },
                { label: "Email", value: customer.users.email },
                { label: "Phone", value: customer.phone },
              ]}
            />
          </DetailsSection>

          <DetailsSection title="Where and when">
            <InfoList
              items={[
                {
                  label: "Address",
                  value: data.address,
                  className: "sm:col-span-2",
                },
                { label: "City", value: data.city },
                { label: "Area", value: data.area },
                { label: "Scheduled", value: formatDateTime(data.scheduledAt) },
                { label: "Placed", value: formatDateTime(data.createdAt) },
                {
                  label: "Notes from the customer",
                  value: data.notes,
                  className: "sm:col-span-2",
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

      <StatusUpdateModal
        isOpen={isUpdating}
        onClose={() => setIsUpdating(false)}
        title="Update job status"
        description={service.title}
        options={nextOptions}
        noteLabel="Note for the customer"
        isPending={updateStatus.isPending}
        onSubmit={(status, note) =>
          updateStatus.mutate({
            id: data.id,
            payload: { status: status as TBookingStatusUpdate, note },
          })
        }
      />
    </section>
  );
};

export default TechnicianBookingDetailsPage;
