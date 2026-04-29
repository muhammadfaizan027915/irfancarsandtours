import { GetBookingsBodyDto } from "@icat/contracts";
import { UserBookingsTable } from "@icat/features/tables/userbookingstable";
import { getUserBookings } from "@icat/web/data/bookings";

type BookingsContentProps = {
  searchParams: GetBookingsBodyDto;
}

export async function BookingsContent({ searchParams }: BookingsContentProps) {
  const result = await getUserBookings(searchParams);
  const bookings = result?.data;
  const pagination = result?.pagination;

  return <UserBookingsTable bookings={bookings} pagination={pagination} />;
}
