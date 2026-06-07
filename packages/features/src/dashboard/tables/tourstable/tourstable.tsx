import { DataTable } from "@icat/ui/components/data-table";

import { tourColumns } from "./columns/columns";
import { ToursTableProps } from "./tourstable.types";

export async function ToursTable({ tours, pagination }: ToursTableProps) {
  return (
    <DataTable columns={tourColumns} data={tours} pagination={pagination} />
  );
}
