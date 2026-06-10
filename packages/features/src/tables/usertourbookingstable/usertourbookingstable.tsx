import { DataTable } from "@icat/ui/components/data-table";

import { userTourBookingsColumns } from "./columns/columns";
import { UserTourBookingsTableProps } from "./usertourbookingstable.types";

export async function UserTourBookingsTable({
  bookings,
  pagination,
}: UserTourBookingsTableProps) {
  return (
    <DataTable
      columns={userTourBookingsColumns}
      pagination={pagination}
      data={bookings}
    />
  );
}
