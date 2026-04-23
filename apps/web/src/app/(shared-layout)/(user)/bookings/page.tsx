import { GetBookingsBodyDto } from "@icat/contracts";
import { Suspense } from "react";
import { BookingsContent, BookingsContentSkeleton } from "@icat/features/contents/bookings";

type UserBookingsPageProps = {
  searchParams: Promise<GetBookingsBodyDto>;
};

export default async function UserBookingsPage({
  searchParams,
}: UserBookingsPageProps) {
  const filters = await searchParams;

  return (
    <Suspense fallback={<BookingsContentSkeleton />}>
      <BookingsContent searchParams={filters} />
    </Suspense>
  );
}
