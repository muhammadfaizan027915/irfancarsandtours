import { GetBookingsBodyDto } from "@icat/contracts";
import { BookingsTable } from "@icat/features/dashboard/tables/bookingstable";
import { getBookings } from "@icat/web/data/bookings";

export async function DashboardBookingsContent({ searchParams }: { searchParams: GetBookingsBodyDto }) {
  const { page, limit } = searchParams;
  const result = await getBookings({ page, limit });
  const bookings = result?.data;
  const pagination = result?.pagination;

  return <BookingsTable bookings={bookings} pagination={pagination} />;
}
