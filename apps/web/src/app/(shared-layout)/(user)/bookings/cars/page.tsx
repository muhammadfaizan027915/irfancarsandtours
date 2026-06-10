import { GetBookingsBodyDto } from "@icat/contracts";
import { Suspense } from "react";
import { BookingsContent } from "@icat/features/contents/bookings";
import { DataTableSkeleton } from "@icat/ui";

type UserCarBookingsPageProps = {
  searchParams: Promise<GetBookingsBodyDto>;
};

export default async function UserCarBookingsPage({
  searchParams,
}: UserCarBookingsPageProps) {
  const filters = await searchParams;

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <BookingsContent searchParams={filters} />
    </Suspense>
  );
}
