import { Skeleton } from "@icat/ui/components/skeleton";

export function DashboardCarEditContentSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-24 rounded-xl" />
      <div className="bg-card p-6 rounded-2xl border border-border flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
