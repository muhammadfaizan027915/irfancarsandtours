import { DataTable } from "@icat/ui/components/data-table";

import { BookedCarsTableProps } from "./bookedcarstable.types";
import { bookedCarsColumns } from "./columns";

export async function BookedCarsTable({ bookedCars }: BookedCarsTableProps) {
  return <DataTable columns={bookedCarsColumns} data={bookedCars} />;
}
