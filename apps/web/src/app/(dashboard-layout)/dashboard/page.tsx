import { BookingsTable } from "@icat/features";
import { getBookings } from "@icat/web/data/bookings";

export default async function DashboardPage() {
  const result = await getBookings();
  const bookings = result?.data;  
  return <BookingsTable bookings={bookings} />;
}
