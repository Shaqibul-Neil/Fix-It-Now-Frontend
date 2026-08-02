"use client";

import { useState } from "react";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import {
  ActionColumn,
  ConfirmModal,
  ContactColumn,
  StatusPill,
  buildColumn,
} from "@/src/components";
import ReviewDetailsModal from "../components/ReviewDetailsModal";
import ReviewFormPanel from "../components/ReviewFormPanel";
import { useDeleteReviewMutation } from "../hooks/useReviewMutation";
import type { ICustomerReviewRow, IReviewTarget } from "../types/review.types";
import { reviewBaseColumns, type IReviewColumns } from "./ReviewColumns";

export const useCustomerReviewsColumns =
  (): IReviewColumns<ICustomerReviewRow> => {
    const [viewing, setViewing] = useState<ICustomerReviewRow | null>(null);
    const [editing, setEditing] = useState<IReviewTarget | null>(null);
    const [deleting, setDeleting] = useState<ICustomerReviewRow | null>(null);

    const deleteReview = useDeleteReviewMutation(() => setDeleting(null));

    // Who it was for leads, then the job it was about, then the rest.
    const [service, ...rest] = reviewBaseColumns<ICustomerReviewRow>();

    return {
      columns: [
        ContactColumn<ICustomerReviewRow>(
          "technician",
          "Technician",
          (row) => ({
            name: row.technician.name,
            avatar: row.technician.avatar,
          }),
        ),

        service,

        ...rest,

        ...buildColumn<ICustomerReviewRow>([
          {
            id: "status",
            label: "Status",
            size: 150,
            render: (row: ICustomerReviewRow) => (
              <StatusPill status={row.status} />
            ),
          },
        ]),

        ActionColumn<ICustomerReviewRow>(
          [
            {
              icon: Eye,
              label: "View review",
              variant: "noOutline",
              onClick: setViewing,
            },
            {
              icon: SquarePen,
              label: "Edit review",
              variant: "outline",
              onClick: (row) =>
                setEditing({
                  bookingId: row.bookingId,
                  serviceTitle: row.service.title,
                  technicianName: row.technician.name,
                  reviewId: row.id,
                  rating: row.rating,
                  comment: row.comment,
                }),
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

          <ReviewFormPanel target={editing} onClose={() => setEditing(null)} />

          <ConfirmModal
            isOpen={Boolean(deleting)}
            onClose={() => setDeleting(null)}
            mode="cancel"
            title="Delete this review?"
            description="It is removed from the technician's profile and their rating is recalculated. This cannot be undone."
            entityName={deleting?.service.title}
            confirmText="Yes, delete it"
            isPending={deleteReview.isPending}
            onConfirm={() => deleting && deleteReview.mutate(deleting.id)}
          />
        </>
      ),
    };
  };
