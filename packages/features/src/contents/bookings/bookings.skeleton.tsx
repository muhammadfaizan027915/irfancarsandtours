import { Skeleton } from "@icat/ui/components/skeleton";

export function BookingsContentSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 border border-border rounded-xl p-6 bg-card">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center border-t border-border pt-4">
          <Skeleton className="h-6 w-1/4" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
