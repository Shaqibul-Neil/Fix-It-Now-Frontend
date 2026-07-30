"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { ActionColumn, buildColumn } from "@/src/components";
import { formatDate } from "@/src/lib/utils/format.utils";
import ReviewDetailsModal from "../components/ReviewDetailsModal";
import type { ITechnicianReviewRow } from "../types/review.types";
import { reviewBaseColumns, type IReviewColumns } from "./ReviewColumns";

export const useTechnicianReviewsColumns =
  (): IReviewColumns<ITechnicianReviewRow> => {
    const [viewing, setViewing] = useState<ITechnicianReviewRow | null>(null);

    // Service leads, then who wrote it, then the rest of the shared columns.
    const [service, ...rest] = reviewBaseColumns<ITechnicianReviewRow>();

    return {
      columns: [
        service,

        ...buildColumn<ITechnicianReviewRow>([
          {
            id: "customer",
            label: "Customer",
            size: 180,
            render: (row: ITechnicianReviewRow) => (
              <span className="block truncate font-medium">
                {row.customer.name}
              </span>
            ),
          },
        ]),

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
          comment={viewing?.comment ?? null}
          meta={[
            { label: "Service", value: viewing?.service.title },
            { label: "Customer", value: viewing?.customer.name },
            {
              label: "Written",
              value: viewing ? formatDate(viewing.createdAt) : null,
            },
          ]}
        />
      ),
    };
  };
