"use client";

import { useState } from "react";
import { Eye, RefreshCw, Trash2 } from "lucide-react";
import {
  ActionColumn,
  ConfirmModal,
  ContactColumn,
  StatusPill,
  StatusUpdateModal,
  buildColumn,
} from "@/src/components";
import { REVIEW_MODERATION_OPTIONS } from "@/src/lib/options/filter.options";
import type { TReviewStatus } from "@/src/types/types";
import ReviewDetailsModal from "../components/ReviewDetailsModal";
import {
  useDeleteReviewMutation,
  useModerateReviewMutation,
} from "../hooks/useReviewMutation";
import type { IAdminReviewRow } from "../types/review.types";
import { reviewBaseColumns, type IReviewColumns } from "./ReviewColumns";

export const useAdminReviewsColumns = (): IReviewColumns<IAdminReviewRow> => {
  const [viewing, setViewing] = useState<IAdminReviewRow | null>(null);
  const [moderating, setModerating] = useState<IAdminReviewRow | null>(null);
  const [deleting, setDeleting] = useState<IAdminReviewRow | null>(null);

  const moderateReview = useModerateReviewMutation(() => setModerating(null));
  const deleteReview = useDeleteReviewMutation(() => setDeleting(null));

  // Who wrote it, who it is about, then what it is about — the order an admin
  // reads a moderation queue in.
  const [service, ...rest] = reviewBaseColumns<IAdminReviewRow>();

  return {
    columns: [
      ContactColumn<IAdminReviewRow>("customer", "Reviewer", (row) => ({
        name: row.customer.name,
        email: row.customer.email,
        avatar: row.customer.avatar,
      })),

      ContactColumn<IAdminReviewRow>("technician", "Technician", (row) => ({
        name: row.technician.name,
        email: row.technician.email,
        avatar: row.technician.avatar,
      })),

      service,

      ...rest,

      ...buildColumn<IAdminReviewRow>([
        {
          key: "status",
          label: "Status",
          size: 150,
          render: (value: IAdminReviewRow["status"]) => (
            <StatusPill status={value} />
          ),
        },
      ]),

      ActionColumn<IAdminReviewRow>(
        [
          {
            icon: Eye,
            label: "View review",
            variant: "noOutline",
            onClick: setViewing,
          },
          {
            icon: RefreshCw,
            label: "Change status",
            variant: "primary",
            onClick: setModerating,
          },
          {
            icon: Trash2,
            label: "Delete review",
            variant: "destructive",
            onClick: setDeleting,
          },
        ],
        { asDropdown: true, size: 90 },
      ),
    ],

    modals: (
      <>
        <ReviewDetailsModal
          isOpen={Boolean(viewing)}
          onClose={() => setViewing(null)}
          rating={viewing?.rating ?? 0}
          comment={viewing?.comment ?? null}
          meta={[
            { label: "Service", value: viewing?.service.title },
            {
              label: "Status",
              value: viewing ? <StatusPill status={viewing.status} /> : null,
            },
          ]}
        />

        {/* The same modal the technician uses on a job, minus the note — the
            moderation endpoint takes a status and nothing else. */}
        <StatusUpdateModal
          isOpen={Boolean(moderating)}
          onClose={() => setModerating(null)}
          title="Moderate this review"
          description={moderating?.service.title}
          showNote={false}
          options={REVIEW_MODERATION_OPTIONS.filter(
            (option) => option.value !== moderating?.status,
          )}
          isPending={moderateReview.isPending}
          onSubmit={(status) =>
            moderating &&
            moderateReview.mutate({
              id: moderating.id,
              status: status as TReviewStatus,
            })
          }
        />

        <ConfirmModal
          isOpen={Boolean(deleting)}
          onClose={() => setDeleting(null)}
          mode="cancel"
          title="Delete this review?"
          description="The row is gone for good and the technician's rating is recalculated. Hiding it keeps the record instead."
          entityName={deleting?.service.title}
          confirmText="Yes, delete it"
          isPending={deleteReview.isPending}
          onConfirm={() => deleting && deleteReview.mutate(deleting.id)}
        />
      </>
    ),
  };
};
