import { Plus } from 'lucide-react';
import { GetBookingsBodyDto } from "@icat/contracts";
import { BookingsFilterBar } from "@icat/features/dashboard/filtersbars/bookings";
import { DashboardBookingsContent } from "@icat/features/contents/dashboard/bookings";
import { DashboardNavigationUrls } from '@icat/features';
import { Button, DataTableSkeleton } from "@icat/ui";
import { Suspense } from "react";
import Link from "next/link";

type BookingsPageProps = {
  searchParams: Promise<GetBookingsBodyDto>;
};

export default async function BookingsPage({
  searchParams,
}: BookingsPageProps) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Cars Bookings
          </h1>
          <p className="text-muted-foreground">
            Manage all customer cars bookings
          </p>
        </div>
        <Link href={DashboardNavigationUrls.CREATE_CAR_BOOKING}>
          <Button size={"lg"}>
            <Plus className="w-4 h-4 mr-2" />
            Create Booking
          </Button>
        </Link>
      </div>

      <Suspense fallback={null}>
        <BookingsFilterBar />
      </Suspense>

      <Suspense fallback={<DataTableSkeleton />}>
        <DashboardBookingsContent searchParams={params} />
      </Suspense>
    </div>
  );
}
