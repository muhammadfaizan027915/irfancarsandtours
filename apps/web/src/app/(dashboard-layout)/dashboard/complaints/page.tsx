import { GetComplaintsBodyDto } from "@icat/contracts";
import { ComplaintsFilterBar } from "@icat/features/dashboard/filtersbars/complaints";
import { DashboardComplaintsContent } from "@icat/features/contents/dashboard/complaints";
import { Suspense } from "react";
import { DataTableSkeleton } from "@icat/ui";

type ComplaintsPageProps = {
  searchParams: Promise<GetComplaintsBodyDto>;
};

export default async function ComplaintsPage({
  searchParams,
}: ComplaintsPageProps) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Complaints</h1>
        <p className="text-muted-foreground">Manage all customer complaints</p>
      </div>

      <Suspense fallback={null}>
        <ComplaintsFilterBar />
      </Suspense>

      <Suspense fallback={<DataTableSkeleton />}>
        <DashboardComplaintsContent searchParams={params} />
      </Suspense>
    </div>
  );
}
