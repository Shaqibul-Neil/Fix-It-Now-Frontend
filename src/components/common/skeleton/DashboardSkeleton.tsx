import { Skeleton } from "@/src/components/ui/skeleton";
import OverviewSkeleton from "./OverviewSkeleton";

const DashboardSkeleton = ({ chartCount = 2 }: { chartCount?: number }) => {
  return (
    <div className="space-y-4">
      <OverviewSkeleton />

      <div className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: chartCount }, (_, index) => (
          <Skeleton key={`chart-${index}`} className="h-80 bg-project-muted" />
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
