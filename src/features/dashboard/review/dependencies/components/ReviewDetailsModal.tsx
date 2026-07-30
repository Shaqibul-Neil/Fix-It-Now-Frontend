"use client";

import type { ReactNode } from "react";
import { AppButton, AppModal, AppRating, Text } from "@/src/components";

interface IReviewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rating: number;
  comment: string | null;
  // Whatever the calling table wants named — the parties differ per role.
  meta: { label: string; value: ReactNode }[];
}

const ReviewDetailsModal = ({
  isOpen,
  onClose,
  rating,
  comment,
  meta,
}: IReviewDetailsModalProps) => {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Review"
      size="md"
      footer={<AppButton text="Close" onClick={onClose} />}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <AppRating readOnly value={rating} size={20} />
          <Text
            variant="semibold-base"
            as="span"
            className="text-project-accent"
          >
            {rating} / 5
          </Text>
        </div>

        {/* The table truncates this; here it is shown whole. */}
        <div className="border border-project-border bg-project-muted/40 p-4">
          <Text
            variant="normal-sm"
            as="p"
            className="wrap-break-word whitespace-pre-wrap text-project-foreground"
          >
            {comment?.trim() || "The customer left a rating without a comment."}
          </Text>
        </div>

        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {meta.map((item) => (
            <div key={item.label} className="min-w-0">
              <dt className="text-xs uppercase tracking-[0.14em] text-project-muted-foreground">
                {item.label}
              </dt>
              <dd className="mt-1 wrap-break-word text-sm font-medium text-project-foreground">
                {item.value ?? "—"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </AppModal>
  );
};

export default ReviewDetailsModal;
