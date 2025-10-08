import { DataTable } from "@icat/ui";
import { userBookingsColumns } from "./columns";
import { BookingService } from "@icat/services";
import { auth } from "@icat/lib";

export async function UserBookingsTable() {
  const session = await auth();
  const sessionUser = session?.user;

  if (!sessionUser?.id) return <p>Not authenticated</p>;

  const bookingService = new BookingService();
  const result = await bookingService.getAllByUserId({
    userId: sessionUser.id,
  });

  const bookings = result.data;

  return <DataTable columns={userBookingsColumns} data={bookings} />;
}
