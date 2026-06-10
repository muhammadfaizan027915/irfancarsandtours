import { Plus } from 'lucide-react';
import { GetTourBookingsBodyDto } from "@icat/contracts";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { DashboardTourBookingsContent } from "@icat/features/contents/dashboard/tourbookings";
import { TourBookingsFilterBar } from "@icat/features/dashboard/filtersbars/tourbookings";
import { Suspense } from "react";
import { Button, DataTableSkeleton } from "@icat/ui";
import Link from "next/link";

type TourBookingsPageProps = {
  searchParams: Promise<GetTourBookingsBodyDto>;
};

export default async function TourBookingsPage({ searchParams }: TourBookingsPageProps) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tours Bookings</h1>
          <p className="text-muted-foreground">Manage all customer tours bookings</p>
        </div>
        <Link href={DashboardNavigationUrls.CREATE_TOUR_BOOKING}>
          <Button size={"lg"}>
            <Plus className="w-4 h-4 mr-2" />
            Create Booking
          </Button>
        </Link>
      </div>

      <Suspense fallback={null}>
        <TourBookingsFilterBar />
      </Suspense>

      <Suspense fallback={<DataTableSkeleton />}>
        <DashboardTourBookingsContent searchParams={params} />
      </Suspense>
    </div>
  );
}
