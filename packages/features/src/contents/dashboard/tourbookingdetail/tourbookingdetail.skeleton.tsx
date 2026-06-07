import { Card, CardContent, CardHeader, Skeleton } from "@icat/ui";

export function DashboardTourBookingDetailContentSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
        <Card className="xl:col-span-4 shadow-none">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
        <Card className="xl:col-span-2 shadow-none">
          <CardHeader>
            <Skeleton className="h-8 w-32 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-6 flex flex-col items-center">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-none">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
