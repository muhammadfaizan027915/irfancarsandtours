import { Skeleton } from "@icat/ui/components/skeleton";

export function CarDetailContentSkeleton() {
  return (
    <div className="grid gap-6">
      <Skeleton className="h-[400px] w-full" />
      <div className="container mx-auto grid gap-6">
        <Skeleton className="h-12 w-1/2" />
        <div className="grid grid-cols-6 items-start gap-6">
          <div className="grid gap-6 col-span-6 lg:col-span-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
          <div className="grid gap-6 col-span-6 lg:col-span-2">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
