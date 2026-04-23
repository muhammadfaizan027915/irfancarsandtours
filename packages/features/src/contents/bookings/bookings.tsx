import { GetBookingsBodyDto } from "@icat/contracts";
import { getUserBookings } from "@icat/web/data/bookings";
import { UserBookingsTable } from "@icat/features/tables/userbookingstable";

export async function BookingsContent({ searchParams }: { searchParams: GetBookingsBodyDto }) {
  const result = await getUserBookings(searchParams);
  const bookings = result?.data;
  const pagination = result?.pagination;

  return <UserBookingsTable bookings={bookings} pagination={pagination} />;
}
