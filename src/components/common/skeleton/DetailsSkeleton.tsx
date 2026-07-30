import { Skeleton } from "@/src/components/ui/skeleton";

const DetailsSkeleton = ({ sectionCount = 3 }: { sectionCount?: number }) => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-28 bg-project-muted" />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {Array.from({ length: sectionCount }, (_, index) => (
            <Skeleton
              key={`section-${index}`}
              className="h-44 bg-project-muted"
            />
          ))}
        </div>

        <Skeleton className="h-72 bg-project-muted" />
      </div>
    </div>
  );
};

export default DetailsSkeleton;
