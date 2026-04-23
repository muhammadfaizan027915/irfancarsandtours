import { GetUsersBodyDto } from "@icat/contracts";
import { Suspense } from "react";
import { DashboardCustomersContent, DashboardCustomersContentSkeleton } from "@icat/features/contents/dashboard/customers";

type CustomersPageProps = {
  searchParams: Promise<GetUsersBodyDto>;
};

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const params = await searchParams;

  return (
    <Suspense fallback={<DashboardCustomersContentSkeleton />}>
      <DashboardCustomersContent searchParams={params} />
    </Suspense>
  );
}
