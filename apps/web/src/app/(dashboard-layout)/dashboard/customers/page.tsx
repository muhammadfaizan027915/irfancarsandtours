import { GetUsersBodyDto } from "@icat/contracts";
import { Suspense } from "react";
import { DashboardCustomersContent } from "@icat/features/contents/dashboard/customers";
import { CustomersFilterBar } from "@icat/features/dashboard/filtersbars/customers";
import { DataTableSkeleton } from "@icat/ui";

type CustomersPageProps = {
  searchParams: Promise<GetUsersBodyDto>;
};

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">Manage all registered customers</p>
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
