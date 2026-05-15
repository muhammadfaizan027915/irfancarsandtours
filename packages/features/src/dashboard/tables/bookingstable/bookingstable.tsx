import { DataTable } from "@icat/ui/components/data-table";

import { BookingsTableProps } from "./bookingstable.types";
import { bookingsColumns } from "./columns";

export async function BookingsTable({ bookings, pagination }: BookingsTableProps) {
  return <DataTable columns={bookingsColumns} data={bookings} pagination={pagination} />;
}
