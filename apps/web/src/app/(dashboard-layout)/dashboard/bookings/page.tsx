import { GetBookingsBodyDto } from "@icat/contracts";
import { BookingsTable } from "@icat/features/dashboard/tables/bookingstable";
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

  return <BookingsTable bookings={bookings} pagination={pagination} />;
}
