import { Skeleton } from "@icat/ui/components/skeleton";

export function HomeWhyChooseSkeleton() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <Skeleton className="mx-auto h-6 w-32 rounded-full" />
          <Skeleton className="mx-auto mt-4 h-10 w-80 rounded-lg" />
          <Skeleton className="mx-auto mt-3 h-4 w-96 rounded-lg" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
              <Skeleton className="h-48 w-full" />
              <div className="p-5">
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="mt-3 h-4 w-full rounded" />
                <Skeleton className="mt-2 h-4 w-5/6 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeWhyChooseSkeleton;
