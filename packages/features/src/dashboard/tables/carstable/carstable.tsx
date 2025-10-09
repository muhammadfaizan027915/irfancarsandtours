import { DataTable } from "@icat/ui";
import { carsColumns } from "./columns";
import { CarsTableProps } from "./carstable.types";

export async function CarsTable({ cars }: CarsTableProps) {
  return <DataTable columns={carsColumns} data={cars} />;
}
