import { Skeleton } from "@icat/ui/components/skeleton";

export function ProfileContentSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
      {/* UserAvatar Skeleton */}
      <div className="bg-card p-6 rounded-2xl flex flex-col items-center gap-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex flex-col gap-8">
        {/* ProfileForm Skeleton */}
        <div className="bg-card p-6 rounded-2xl flex flex-col gap-6">
          <Skeleton className="h-8 w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-32 ml-auto" />
        </div>
        {/* ChangePasswordForm Skeleton */}
        <div className="bg-card p-6 rounded-2xl flex flex-col gap-6">
          <Skeleton className="h-8 w-1/4" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-32 ml-auto" />
        </div>
      </div>
    </div>
  );
}
