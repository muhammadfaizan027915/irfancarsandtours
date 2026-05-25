import { GetBookingsBodyDto } from "@icat/contracts";
import { BookingsFilterBar } from "@icat/features/dashboard/filtersbars/bookings";
import { DashboardBookingsContent } from "@icat/features/contents/dashboard/bookings";
import { Suspense } from "react";
import { Button, DataTableSkeleton } from "@icat/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";

type BookingsPageProps = {
  searchParams: Promise<GetBookingsBodyDto>;
};

export default async function BookingsPage({
  searchParams,
}: BookingsPageProps) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage all customer bookings</p>
        </div>
        <Link href={DashboardNavigationUrls.CREATE_BOOKING}>
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
