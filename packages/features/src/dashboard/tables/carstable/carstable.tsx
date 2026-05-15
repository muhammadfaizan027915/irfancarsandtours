import { DataTable } from "@icat/ui/components/data-table";

import { CarsTableProps } from "./carstable.types";
import { carsColumns } from "./columns";

export async function CarsTable({ cars, pagination }: CarsTableProps) {
  return <DataTable columns={carsColumns} data={cars} pagination={pagination} />;
}
