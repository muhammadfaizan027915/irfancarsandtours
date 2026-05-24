import { GetUsersBodyDto } from "@icat/contracts";
import { Suspense } from "react";
import { DashboardCustomersContent } from "@icat/features/contents/dashboard/customers";
import { CustomersFilterBar } from "@icat/features/dashboard/filtersbars/customers";
import { Button, DataTableSkeleton } from "@icat/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";

type CustomersPageProps = {
  searchParams: Promise<GetUsersBodyDto>;
};

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage all registered customers</p>
        </div>
        <Link href={DashboardNavigationUrls.CREATE_CUSTOMER}>
          <Button size={"lg"}>
            <Plus className="w-4 h-4 mr-2" />
            Create Customer
          </Button>
        </Link>
      </div>

      <Suspense fallback={null}>
        <CustomersFilterBar />
      </Suspense>

      <Suspense fallback={<DataTableSkeleton />}>
        <DashboardCustomersContent searchParams={params} />
      </Suspense>
    </div>
  );
}
