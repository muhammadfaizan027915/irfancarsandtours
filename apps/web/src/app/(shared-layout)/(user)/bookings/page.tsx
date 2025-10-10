import { UserBookingsTable } from "@icat/features/tables/userbookingstable";
import { getUserBookings } from "@icat/web/data/bookings";

export default async function UserBookingsPage() {
  const result = await getUserBookings();
  return <UserBookingsTable bookings={result.data} />;
}
