import { DataTable } from "@icat/ui";
import { bookingsColumns } from "./columns";
import { BookingsTableProps } from "./bookingstable.types";

export async function BookingsTable({ bookings }: BookingsTableProps) {
  return <DataTable columns={bookingsColumns} data={bookings} />;
}
