import { DataTable } from "@icat/ui/components/data-table";

import { BookedToursTableProps } from "./bookedtourstable.types";
import { bookedToursColumns } from "./columns";


export async function BookedToursTable({ bookedTours }: BookedToursTableProps) {
  return <DataTable columns={bookedToursColumns} data={bookedTours} />;
}
