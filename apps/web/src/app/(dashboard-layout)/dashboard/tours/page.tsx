import { GetToursBodyDto } from "@icat/contracts";
import { DashboardToursContent } from "@icat/features/contents/dashboard/tours";
import { ToursFilterBar } from "@icat/features/dashboard/filtersbars/tours";
import { Button } from "@icat/ui/components/button";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import { DataTableSkeleton } from "@icat/ui";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";

type ToursPageProps = {
  searchParams: Promise<GetToursBodyDto>;
};

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight">Tours</h1>
          <p className="text-muted-foreground">
            Manage your Tour packages and itineraries.
          </p>
        </div>

        <Button className="w-fit" size={"lg"} asChild>
          <Link href={DashboardNavigationUrls.CREATE_TOUR}>
            <Plus className="mr-2 h-4 w-4" /> Create New Tour
          </Link>
        </Button>
      </div>

      <Suspense fallback={null}>
        <ToursFilterBar />
      </Suspense>

      <Suspense fallback={<DataTableSkeleton />}>
        <DashboardToursContent searchParams={params} />
      </Suspense>
    </div>
  );
}
