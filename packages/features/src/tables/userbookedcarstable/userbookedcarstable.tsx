import { DataTable } from "@icat/ui";
import { userBookedCarsColumns } from "./columns";
import { UserBookedCarsTableProps } from "./userbookedcarstable.types";

export async function UserBookedCarsTable({
  bookedCars,
}: UserBookedCarsTableProps) {
  if (!bookedCars) return;
  return <DataTable columns={userBookedCarsColumns} data={bookedCars} />;
}
