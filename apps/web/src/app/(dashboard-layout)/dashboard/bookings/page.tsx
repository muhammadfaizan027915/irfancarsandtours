import { GetBookingsBodyDto } from "@icat/contracts";
import { BookingsTable } from "@icat/features/dashboard/tables/bookingstable";
import { BookingsFilterBar } from "@icat/features/dashboard/filtersbars/bookings";
import { getBookings } from "@icat/web/data/bookings";

type BookingsPageProps = {
  searchParams: Promise<GetBookingsBodyDto>;
};

export default async function BookingsPage({
  searchParams,
}: BookingsPageProps) {
  const { page, limit } = await searchParams;

  const result = await getBookings({ page, limit });
  const bookings = result?.data;
  const pagination = result?.pagination;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage all customer bookings</p>
      </div>

      <BookingsFilterBar />

      <BookingsTable bookings={bookings} pagination={pagination} />
    </div>
  );
}
