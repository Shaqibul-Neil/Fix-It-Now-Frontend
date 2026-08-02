import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";
import ReviewCard, { type IReviewEntry } from "./ReviewCard";

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
        <li key={entry.id}>
          <ReviewCard entry={entry} />
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
