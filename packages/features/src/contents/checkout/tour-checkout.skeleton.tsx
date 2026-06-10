import { Skeleton } from "@icat/ui/components/skeleton";

export function TourCheckoutContentSkeleton() {
  return (
    <div className="container mx-auto">
      <Skeleton className="h-10 w-48 mb-4" /> {/* Title Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] items-start gap-6">
        {/* TourBooking Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="h-32 w-full" />
        </div>

        {/* TourCartList Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
