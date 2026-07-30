"use client";

import { useState } from "react";
import { Ban, CreditCard } from "lucide-react";
import {
  AppButton,
  AppError,
  ConfirmModal,
  DetailsHeader,
  DetailsSection,
  DetailsSkeleton,
  InfoList,
  StatusPill,
  StatusTimeline,
} from "@/src/components";
import { formatDateTime, formatMoney } from "@/src/lib/utils/format.utils";
import { CANCELABLE, PAYABLE } from "../dependencies/booking.rules";
import {
  useCancelBookingMutation,
  useCreatePaymentMutation,
} from "../dependencies/hooks/useBookingMutation";
import { useCustomerBookingDetailsQuery } from "../dependencies/hooks/useBookingQuery";

const CustomerBookingDetailsPage = ({ id }: { id: string }) => {
  const { data, isPending, isError, error } = useCustomerBookingDetailsQuery(id);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const cancelBooking = useCancelBookingMutation(() => setIsCancelling(false));
  const createPayment = useCreatePaymentMutation();

  if (isPending) return <DetailsSkeleton sectionCount={2} />;
  if (isError || !data) return <AppError message={error?.message} />;

  const { technician, service } = data;
  const technicianName = `${technician.users.firstName} ${technician.users.lastName}`;

  return (
    <section className="space-y-4">
      <DetailsHeader
        title="Booking"
        name={service.title}
        status={<StatusPill status={data.status} />}
        metaItems={[
          { label: "Category", value: service.category.name },
          { label: "Technician", value: technicianName },
          { label: "Amount", value: formatMoney(data.amount) },
          { label: "Scheduled", value: formatDateTime(data.scheduledAt) },
        ]}
        renderActions={
          <>
            {PAYABLE.includes(data.status) && (
              <AppButton
                text="Pay now"
                rightIcon={CreditCard}
                disabled={createPayment.isPending}
                // Only an accepted booking can be paid, so a requested one is
                // told why instead of hitting a backend error.
                onClick={() =>
                  data.status === "ACCEPTED"
                    ? createPayment.mutate(data.id)
                    : setIsWaiting(true)
                }
              />
            )}

            {CANCELABLE.includes(data.status) && (
              <AppButton
                variant="destructiveOutline"
                text="Cancel booking"
                rightIcon={Ban}
                onClick={() => setIsCancelling(true)}
              />
            )}
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <DetailsSection title="Your technician">
            <InfoList
              items={[
                { label: "Name", value: technicianName },
                { label: "Rating", value: technician.averageRating },
                { label: "Service", value: service.title },
                { label: "Listed price", value: formatMoney(service.price) },
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
                  label: "Your notes",
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

      <ConfirmModal
        isOpen={isCancelling}
        onClose={() => setIsCancelling(false)}
        mode="cancel"
        title="Cancel this booking?"
        description="The technician is notified straight away. This cannot be undone."
        entityName={service.title}
        isPending={cancelBooking.isPending}
        onConfirm={() => cancelBooking.mutate(data.id)}
      />

      <ConfirmModal
        isOpen={isWaiting}
        onClose={() => setIsWaiting(false)}
        mode="info"
        title="Waiting for the technician"
        description="Payment opens once the technician accepts this booking. You will be notified."
        entityName={service.title}
      />
    </section>
  );
};

export default CustomerBookingDetailsPage;
