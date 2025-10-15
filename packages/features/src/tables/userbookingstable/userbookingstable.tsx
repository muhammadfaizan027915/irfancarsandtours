import { userBookingsColumns } from "./columns";
import { DataTable } from "@icat/ui/components/data-table";
import { UserBookingsTableProps } from "./userbookingstable.types";

export async function UserBookingsTable({
  bookings,
  pagination,
}: UserBookingsTableProps) {
  return (
    <DataTable
      columns={userBookingsColumns}
      pagination={pagination}
      data={bookings}
    />
  );
}
