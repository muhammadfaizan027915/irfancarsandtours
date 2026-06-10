import { GetTourBookingsBodyDto } from "@icat/contracts";
import { Suspense } from "react";
import { TourBookingsContent } from "@icat/features/contents/tourbookings";
import { DataTableSkeleton } from "@icat/ui";

type UserTourBookingsPageProps = {
  searchParams: Promise<GetTourBookingsBodyDto>;
};

export default async function UserTourBookingsPage({
  searchParams,
}: UserTourBookingsPageProps) {
  const filters = await searchParams;

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <TourBookingsContent searchParams={filters} />
    </Suspense>
  );
}
