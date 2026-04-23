import { Skeleton } from "@icat/ui/components/skeleton";

export function DashboardBookingsContentSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <Skeleton className="h-10 w-1/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </div>

      <div className="flex gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="border border-border rounded-xl p-4 bg-card">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
