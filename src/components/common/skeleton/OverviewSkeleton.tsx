import { Skeleton } from "@/src/components/ui/skeleton";

const OverviewSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={`stat-${index}`} className="h-30 bg-project-muted" />
      ))}
    </div>
  );
};

export default OverviewSkeleton;
