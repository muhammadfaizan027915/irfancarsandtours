import { DataTable } from "@icat/ui";
import { userBookingsColumns } from "./columns";
import { UserBookingsTableProps } from "./userbookingstable.types";

export async function UserBookingsTable({ bookings }: UserBookingsTableProps) {
  return <DataTable columns={userBookingsColumns} data={bookings} />;
}
