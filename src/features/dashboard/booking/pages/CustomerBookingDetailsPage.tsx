"use client";

import { useState } from "react";
import { Ban, CreditCard, Star } from "lucide-react";
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
import ReviewFormPanel from "@/src/features/dashboard/review/dependencies/components/ReviewFormPanel";
import type { IReviewTarget } from "@/src/features/dashboard/review/dependencies/types/review.types";
import { formatDateTime, formatMoney } from "@/src/lib/utils/format.utils";
import {
  cancelBlockedReason,
  payBlockedReason,
  reviewBlockedReason,
  type IBlockedAction,
} from "../dependencies/booking.rules";
import {
  useCancelBookingMutation,
  useCreatePaymentMutation,
} from "../dependencies/hooks/useBookingMutation";
import { useCustomerBookingDetailsQuery } from "../dependencies/hooks/useBookingQuery";

const CustomerBookingDetailsPage = ({ id }: { id: string }) => {
  const { data, isPending, isError, error } =
    useCustomerBookingDetailsQuery(id);
  const [isCancelling, setIsCancelling] = useState(false);
  const [reviewing, setReviewing] = useState<IReviewTarget | null>(null);
  const [blocked, setBlocked] = useState<IBlockedAction | null>(null);

  const cancelBooking = useCancelBookingMutation(() => setIsCancelling(false));
  const createPayment = useCreatePaymentMutation();

  if (isPending) return <DetailsSkeleton sectionCount={2} />;
  if (isError || !data) return <AppError message={error?.message} />;

  const { technician, service } = data;
  const technicianName = `${technician.users.firstName} ${technician.users.lastName}`;

  const isFinished = data.status === "COMPLETED";

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
          // A finished job has nothing left to pay or call off — what it wants
          // is the review, so that takes the same spot.
          isFinished ? (
            <AppButton
              text="Rate this technician"
              rightIcon={Star}
              onClick={() => {
                const reason = reviewBlockedReason(
                  data.status,
                  data.review?.id ?? null,
                );
                if (reason) return setBlocked(reason);
                setReviewing({
                  bookingId: data.id,
                  serviceTitle: service.title,
                  technicianName,
                });
              }}
            />
          ) : (
            <>
              <AppButton
                text="Pay now"
                rightIcon={CreditCard}
                disabled={createPayment.isPending}
                onClick={() => {
                  const reason = payBlockedReason(data.status);
                  if (reason) return setBlocked(reason);
                  createPayment.mutate(data.id);
                }}
              />

              <AppButton
                variant="destructiveOutline"
                text="Cancel booking"
                rightIcon={Ban}
                onClick={() => {
                  const reason = cancelBlockedReason(data.status);
                  if (reason) return setBlocked(reason);
                  setIsCancelling(true);
                }}
              />
            </>
          )
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

      <ReviewFormPanel target={reviewing} onClose={() => setReviewing(null)} />

      {/* One modal for every action this status does not allow. */}
      <ConfirmModal
        isOpen={Boolean(blocked)}
        onClose={() => setBlocked(null)}
        mode="info"
        title={blocked?.title ?? ""}
        description={blocked?.description}
        entityName={service.title}
      />
    </section>
  );
};

export default CustomerBookingDetailsPage;
