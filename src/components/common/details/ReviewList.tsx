import { formatDate } from "@/src/lib/utils/format.utils";
import { cn } from "@/src/lib/utils/cn";
import AppAvatar from "../cards/AppAvatar";
import AppRating from "../inputs/AppRating";
import Text from "../texts/Text";

export interface IReviewEntry {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  author: string;
  authorAvatar?: string | null;
  // What the review was written about — a service, a job, a listing.
  subject?: string | null;
}

interface IReviewListProps {
  entries: IReviewEntry[];
  emptyMessage?: string;
  className?: string;
}

const ReviewList = ({
  entries,
  emptyMessage = "Nothing written yet.",
  className,
}: IReviewListProps) => {
  if (entries.length === 0) {
    return (
      <Text
        variant="normal-sm"
        as="p"
        className="text-project-muted-foreground"
      >
        {emptyMessage}
      </Text>
    );
  }

  return (
    <ul className={cn("space-y-3", className)}>
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="border border-project-border bg-project-muted/30 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <AppAvatar
                src={entry.authorAvatar}
                name={entry.author}
                className="size-9 shrink-0"
              />

              <div className="min-w-0 leading-tight">
                <span className="block truncate font-medium">
                  {entry.author}
                </span>

                <Text
                  variant="normal-xs"
                  as="span"
                  className="block truncate text-project-muted-foreground"
                >
                  {entry.subject ?? formatDate(entry.createdAt)}
                </Text>
              </div>
            </div>

            <AppRating value={entry.rating} readOnly size={13} />
          </div>

          {entry.comment && (
            <Text
              variant="normal-sm"
              as="p"
              className="mt-3 whitespace-pre-line"
            >
              {entry.comment}
            </Text>
          )}

          <Text
            variant="normal-xs"
            as="span"
            className="mt-3 block text-project-muted-foreground"
          >
            {formatDate(entry.createdAt)}
          </Text>
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
