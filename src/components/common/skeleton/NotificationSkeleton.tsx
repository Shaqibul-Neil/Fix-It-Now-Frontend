import { Skeleton } from "@/src/components/ui/skeleton";

const NotificationSkeleton = ({ rows = 4 }: { rows?: number }) => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="flex gap-3 border-l-2 border-transparent p-3"
        >
          <Skeleton className="size-9 shrink-0" />

          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-3.5 w-40" />
              <Skeleton className="h-3 w-12 shrink-0" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
