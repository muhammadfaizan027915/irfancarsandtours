import { auth } from "@icat/lib";
import { bookingsColumns } from "./columns";
import { DataTable } from "@icat/ui";
import { BookingService } from "@icat/services";

export async function BookingsTable() {
  const session = await auth();

  if (!session?.user?.email) return <p>Not authenticated</p>;

  const bookingService = new BookingService();
  const result = await bookingService.getAll();
  const bookings = result.data;

  return <DataTable columns={bookingsColumns} data={bookings} />;
}
