import { GetBookingsBodyDto } from "@icat/contracts";
import { BookingsTable } from "@icat/features/dashboard/tables/bookingstable";
import { getBookings } from "@icat/web/data/bookings";

type DashboardBookingsContentProps = {
  searchParams: GetBookingsBodyDto;
};

export async function DashboardBookingsContent({
  searchParams,
}: DashboardBookingsContentProps) {
  const result = await getBookings(searchParams);
  const bookings = result?.data;
  const pagination = result?.pagination;

  return <BookingsTable bookings={bookings} pagination={pagination} />;
}
