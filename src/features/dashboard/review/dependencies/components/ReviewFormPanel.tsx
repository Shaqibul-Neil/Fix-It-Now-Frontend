"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import {
  AppButton,
  AppRating,
  AppTextArea,
  ResultState,
  SidePanel,
  Text,
} from "@/src/components";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "../hooks/useReviewMutation";
import { reviewFormSchema, type TReviewForm } from "../schema/review.schema";
import type { IReviewTarget } from "../types/review.types";

interface IReviewFormPanelProps {
  target: IReviewTarget | null;
  onClose: () => void;
}

const RATING_CAPTION: Record<number, string> = {
  1: "Poor",
  2: "Not great",
  3: "Okay",
  4: "Good",
  5: "Excellent",
};

const EMPTY_FORM: TReviewForm = { rating: 0, comment: "" };

const ReviewFormPanel = ({ target, onClose }: IReviewFormPanelProps) => {
  const [isDone, setIsDone] = useState(false);

  const isEditing = Boolean(target?.reviewId);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TReviewForm>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: EMPTY_FORM,
  });

  // Every control starts over for whichever booking opened the panel. Closing
  // is skipped so the slide-out animation does not flash an empty form.
  const [lastBookingId, setLastBookingId] = useState(target?.bookingId);
  if (target?.bookingId !== lastBookingId) {
    setLastBookingId(target?.bookingId);
    if (target) {
      setIsDone(false);
      reset({
        rating: target.rating ?? 0,
        comment: target.comment ?? "",
      });
    }
  }

  const createReview = useCreateReviewMutation(() => setIsDone(true));
  const updateReview = useUpdateReviewMutation(() => setIsDone(true));

  const isPending = createReview.isPending || updateReview.isPending;

  const submit = handleSubmit(({ rating, comment }) => {
    if (!target) return;

    if (target.reviewId) {
      updateReview.mutate({
        id: target.reviewId,
        payload: { rating, comment: comment || undefined },
      });
      return;
    }

    createReview.mutate({
      bookingId: target.bookingId,
      rating,
      comment: comment || undefined,
    });
  });

  return (
    <SidePanel
      isOpen={Boolean(target)}
      onOpenChange={(open) => !open && onClose()}
      title={
        isDone
          ? "Thank you"
          : isEditing
            ? "Edit your review"
            : "Rate this technician"
      }
      description={target?.serviceTitle}
      footer={
        isDone ? (
          <AppButton text="Done" onClick={onClose} />
        ) : (
          <>
            <AppButton
              variant="outline"
              text="Cancel"
              onClick={onClose}
              disabled={isPending}
            />
            <AppButton
              type="submit"
              form="review-form"
              text={isEditing ? "Save changes" : "Submit review"}
              disabled={isPending}
            />
          </>
        )
      }
    >
      {isDone ? (
        <ResultState
          tone="success"
          titleAs="h3"
          icon={Star}
          title={isEditing ? "Review updated" : "Review submitted"}
          description="An admin checks every review before it goes live on the technician's profile. You will be notified once it is published."
          className="border-0 p-0 sm:p-0"
          meta={[
            { label: "Service", value: target?.serviceTitle },
            { label: "Technician", value: target?.technicianName },
          ]}
        />
      ) : (
        <form id="review-form" className="space-y-5" onSubmit={submit}>
          <div className="border border-project-border bg-project-muted/40 p-4">
            <Text
              variant="medium-xs"
              as="span"
              className="block uppercase tracking-[0.14em] text-project-muted-foreground"
            >
              You are reviewing
            </Text>

            <Text
              variant="semibold-base"
              as="p"
              className="mt-2 text-project-accent"
            >
              {target?.technicianName}
            </Text>

            <Text
              variant="normal-sm"
              as="p"
              className="mt-1 text-project-muted-foreground"
            >
              {target?.serviceTitle}
            </Text>
          </div>

          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <AppRating
                label="How did it go?"
                value={field.value}
                onChange={field.onChange}
                caption={RATING_CAPTION[field.value]}
                error={errors.rating?.message}
              />
            )}
          />

          <AppTextArea
            label="Tell others about the job"
            placeholder="What went well, what could have been better"
            maxLength={2000}
            disabled={isPending}
            error={errors.comment?.message}
            {...register("comment")}
          />
        </form>
      )}
    </SidePanel>
  );
};

export default ReviewFormPanel;
