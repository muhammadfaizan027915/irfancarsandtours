import { GetCarsBodyDto } from "@icat/contracts";
import { DashboardCarsContent } from "@icat/features/contents/dashboard/cars";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { CarsFilterBar } from "@icat/features/dashboard/filtersbars/cars";
import { Button } from "@icat/ui/components/button";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import { DataTableSkeleton } from "@icat/ui";

type CarsPageProps = {
  searchParams: Promise<GetCarsBodyDto>;
};

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight">Cars</h1>
          <p className="text-muted-foreground">
            Register and Manage your Cars in the System.
          </p>
        </div>

        <Button className="w-fit" size={"lg"} asChild>
          <Link href={DashboardNavigationUrls.REGISTER_CAR}>
            <Plus /> Register New
          </Link>
        </Button>
      </div>

      <Suspense fallback={null}>
        <CarsFilterBar />
      </Suspense>

      <Suspense fallback={<DataTableSkeleton />}>
        <DashboardCarsContent searchParams={params} />
      </Suspense>
    </div>
  );
}
