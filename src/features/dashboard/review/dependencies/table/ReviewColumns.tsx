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
      key: "service",
      label: "Service",
      size: 220,
      render: (value: IReviewRowBase["service"]) => (
        <span className="block truncate font-medium">{value.title}</span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      size: 140,
      render: (value: IReviewRowBase["rating"]) => (
        <AppRating readOnly value={value} size={14} />
      ),
    },
    {
      key: "comment",
      label: "Review",
      size: 200,
      render: (value: IReviewRowBase["comment"]) =>
        toCommentText(value) ? (
          <span className="text-project-muted-foreground line-clamp-1 truncate">
            {toCommentText(value)}
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
      key: "createdAt",
      label: "Written",
      size: 130,
      render: (value: IReviewRowBase["createdAt"]) => (
        <span className="whitespace-nowrap">{formatDate(value)}</span>
      ),
    },
  ]) as ColumnDef<TRow>[];
