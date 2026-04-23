import { Skeleton } from "@icat/ui/components/skeleton";

export function BookingDetailContentSkeleton() {
  return (
    <div className="grid gap-6">
      {/* BookingDetail Skeleton */}
      <div className="bg-card p-6 rounded-2xl border border-border flex flex-col gap-6">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
      {/* UserBookedCarsTable Skeleton */}
      <div className="bg-card p-6 rounded-2xl border border-border flex flex-col gap-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
