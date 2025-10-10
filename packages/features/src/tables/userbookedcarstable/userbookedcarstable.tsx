import { userBookedCarsColumns } from "./columns";
import { DataTable } from "@icat/ui/components/data-table";
import { UserBookedCarsTableProps } from "./userbookedcarstable.types";

export async function UserBookedCarsTable({
  bookedCars,
}: UserBookedCarsTableProps) {
  if (!bookedCars) return;
  return <DataTable columns={userBookedCarsColumns} data={bookedCars} />;
}
