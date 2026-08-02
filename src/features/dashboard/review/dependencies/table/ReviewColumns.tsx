import type { ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { AppRating, Text, buildColumn } from "@/src/components";
import { formatDate } from "@/src/lib/utils/format.utils";

// The shape every review table shares, whichever audience it serves. The
// technician's list comes off the public mapper, so its comment is already
// split into paragraphs — the cell reads both shapes.
interface IReviewRowBase {
  id: string;
  rating: number;
  comment: string | string[] | null;
  createdAt: string;
  service: { id: string; title: string };
}

// One string out of either shape, with the paragraph breaks kept so the details
// modal can render them.
export const toCommentText = (comment: string | string[] | null) =>
  (Array.isArray(comment) ? comment.join("\n\n") : (comment ?? "")).trim();

// A role's columns hook returns its row actions' modals alongside the columns,
// so the page renders {modals} next to the table.
export interface IReviewColumns<TRow> {
  columns: ColumnDef<TRow>[];
  modals: ReactNode;
}

// Service, rating, the truncated comment and the date — in display order.
export const reviewBaseColumns = <TRow extends IReviewRowBase>() =>
  buildColumn<IReviewRowBase>([
    {
      id: "service",
      label: "Service",
      size: 220,
      render: (row: IReviewRowBase) => (
        <span className="block truncate font-medium">{row.service.title}</span>
      ),
    },
    {
      id: "rating",
      label: "Rating",
      size: 140,
      render: (row: IReviewRowBase) => (
        <AppRating readOnly value={row.rating} size={14} />
      ),
    },
    {
      id: "comment",
      label: "Review",
      size: 200,
      render: (row: IReviewRowBase) =>
        toCommentText(row.comment) ? (
          <span className="text-project-muted-foreground line-clamp-1 truncate">
            {toCommentText(row.comment)}
          </span>
        ) : (
          <Text
            variant="normal-xs"
            as="span"
            className="text-project-muted-foreground"
          >
            No comment
          </Text>
        ),
    },
    {
      id: "createdAt",
      label: "Written",
      size: 130,
      render: (row: IReviewRowBase) => (
        <span className="whitespace-nowrap">{formatDate(row.createdAt)}</span>
      ),
    },
  ]) as ColumnDef<TRow>[];
