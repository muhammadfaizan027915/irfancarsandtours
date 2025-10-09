import { DataTable } from "@icat/ui";
import { carsColumns } from "./columns";
import { CarsTableProps } from "./carstable.types";

export async function CarsTable({ cars, pagination }: CarsTableProps) {
  return <DataTable columns={carsColumns} data={cars} pagination={pagination} />;
}
