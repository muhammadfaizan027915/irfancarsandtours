import { Skeleton } from "@icat/ui/components/skeleton";

export function CarCardSkeleton() {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-6 pt-8 bg-card rounded-2xl flex flex-col gap-6">
        <Skeleton className="h-8 w-3/4" />
        <hr className="border-t border-border" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-12" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
}

export function CarsContentSkeleton() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
