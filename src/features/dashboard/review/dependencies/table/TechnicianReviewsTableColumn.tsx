"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { ActionColumn, ContactColumn } from "@/src/components";
import ReviewDetailsModal from "../components/ReviewDetailsModal";
import type { ITechnicianReviewRow } from "../types/review.types";
import {
  reviewBaseColumns,
  toCommentText,
  type IReviewColumns,
} from "./ReviewColumns";

export const useTechnicianReviewsColumns =
  (): IReviewColumns<ITechnicianReviewRow> => {
    const [viewing, setViewing] = useState<ITechnicianReviewRow | null>(null);

    // Who wrote it leads, then the job it was about, then the rest.
    const [service, ...rest] = reviewBaseColumns<ITechnicianReviewRow>();

    return {
      columns: [
        ContactColumn<ITechnicianReviewRow>("customer", "Customer", (row) => ({
          name: row.customer.name,
          avatar: row.customer.avatar,
        })),

        service,

        ...rest,

        // Read-only: a technician can neither edit nor moderate what was
        // written about them.
        ActionColumn<ITechnicianReviewRow>(
          [
            {
              icon: Eye,
              label: "View review",
              variant: "noOutline",
              onClick: setViewing,
            },
          ],
          { asDropdown: true, size: 90 },
        ),
      ],

      modals: (
        <ReviewDetailsModal
          isOpen={Boolean(viewing)}
          onClose={() => setViewing(null)}
          rating={viewing?.rating ?? 0}
          comment={viewing ? toCommentText(viewing.comment) : null}
          meta={[{ label: "Service", value: viewing?.service.title }]}
        />
      ),
    };
  };
