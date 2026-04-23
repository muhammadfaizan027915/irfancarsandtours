import { Skeleton } from "@icat/ui/components/skeleton";

export function CheckoutContentSkeleton() {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_450px] items-start gap-6">
      {/* CarBooking Skeleton */}
      <div className="bg-card p-6 rounded-2xl flex flex-col gap-6">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      {/* CarCartList Skeleton */}
      <div className="bg-card p-6 rounded-2xl flex flex-col gap-6">
        <Skeleton className="h-8 w-1/2" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <hr className="border-t border-border" />
        <div className="flex justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
}
