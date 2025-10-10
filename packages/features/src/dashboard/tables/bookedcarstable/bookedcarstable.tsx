import { DataTable } from "@icat/ui/components/data-table";
import { bookedCarsColumns } from "./columns";
import { BookedCarsTableProps } from "./bookedcarstable.types";

export async function BookedCarsTable({ bookedCars }: BookedCarsTableProps) {
  return <DataTable columns={bookedCarsColumns} data={bookedCars} />;
}
