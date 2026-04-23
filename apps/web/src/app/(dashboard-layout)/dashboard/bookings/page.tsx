import { GetBookingsBodyDto } from "@icat/contracts";
import { BookingsFilterBar } from "@icat/features/dashboard/filtersbars/bookings";
import { DashboardBookingsContent, DashboardBookingsContentSkeleton } from "@icat/features/contents/dashboard/bookings";
import { Suspense } from "react";

type BookingsPageProps = {
  searchParams: Promise<GetBookingsBodyDto>;
};

export default async function BookingsPage({
  searchParams,
}: BookingsPageProps) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage all customer bookings</p>
      </div>

      <Suspense fallback={null}>
        <BookingsFilterBar />
      </Suspense>

      <Suspense fallback={<DashboardBookingsContentSkeleton />}>
        <DashboardBookingsContent searchParams={params} />
      </Suspense>
    </div>
  );
}
