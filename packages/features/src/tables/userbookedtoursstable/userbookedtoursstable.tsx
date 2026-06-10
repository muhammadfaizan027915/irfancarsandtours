import { DataTable } from "@icat/ui/components/data-table";

import { userBookedToursColumns } from "./columns/columns";
import { UserBookedToursTableProps } from "./userbookedtoursstable.types";

export async function UserBookedToursTable({
  bookedTours,
  pagination,
}: UserBookedToursTableProps) {
  return (
    <DataTable
      columns={userBookedToursColumns}
      pagination={pagination}
      data={bookedTours}
    />
  );
}
