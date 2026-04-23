import { Skeleton } from "@icat/ui/components/skeleton";

export function DashboardCustomersContentSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
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
