import { DataTable } from "@icat/ui";

import { tourBookingColumns } from "./columns/columns";
import { TourBookingsTableProps } from "./tourbookingstable.types";


export async function TourBookingsTable({ tourBookings, pagination }: TourBookingsTableProps) {
  return <DataTable columns={tourBookingColumns} data={tourBookings} pagination={pagination} />;
}
