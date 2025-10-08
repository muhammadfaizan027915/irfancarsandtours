import { DataTable } from "@icat/ui";
import { bookedCarsColumns } from "./columns";
import { BookedCarService } from "@icat/services";
import { auth } from "@icat/lib";
import { BookedCarsTableProps } from "./bookedcarstable.types";

export async function BookedCarsTable({ bookingId }: BookedCarsTableProps) {
  const session = await auth();
  const sessionUser = session?.user;

  if (!sessionUser?.id) return <p>Not authenticated</p>;

  const bookedCarService = new BookedCarService();
  const bookedCars = await bookedCarService.getByBookingIdWithCars(bookingId);

  return <DataTable columns={bookedCarsColumns} data={bookedCars} />;
}
