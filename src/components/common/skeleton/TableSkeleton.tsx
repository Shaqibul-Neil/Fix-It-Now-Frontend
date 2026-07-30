import { Skeleton } from "@/src/components/ui/skeleton";

const TableSkeleton = ({ rowCount = 6 }: { rowCount?: number }) => {
  return (
    <div className="w-full border border-project-border bg-project-card">
      <div className="h-11 border-b border-project-border bg-project-muted" />

      <div className="divide-y divide-project-border">
        {Array.from({ length: rowCount }, (_, index) => (
          <div key={`row-${index}`} className="flex items-center gap-4 px-4">
            <Skeleton className="my-4 h-6 flex-1 bg-project-muted" />
            <Skeleton className="my-4 h-6 w-32 bg-project-muted" />
            <Skeleton className="my-4 h-6 w-24 bg-project-muted" />
            <Skeleton className="my-4 h-6 w-20 bg-project-muted" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
