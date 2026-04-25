import { Skeleton } from "./skeleton";

export function DataTableSkeleton({ rows = 5 }: { rows?: number }) {
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
