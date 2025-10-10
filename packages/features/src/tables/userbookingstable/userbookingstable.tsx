import { userBookingsColumns } from "./columns";
import { DataTable } from "@icat/ui/components/data-table";
import { UserBookingsTableProps } from "./userbookingstable.types";

export async function UserBookingsTable({ bookings }: UserBookingsTableProps) {
  return <DataTable columns={userBookingsColumns} data={bookings} />;
}
