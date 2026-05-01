import { Skeleton } from "./skeleton";

type DataTableSkeletonProps = {
  rows?: number;
};

export function DataTableSkeleton({ rows = 5 }: DataTableSkeletonProps) {
  return (
    <div className="border border-border rounded-xl p-4 bg-card">
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}
