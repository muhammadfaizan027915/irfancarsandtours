import { auth } from "@icat/lib";
import { carsColumns } from "./columns";
import { DataTable } from "@icat/ui";
import { CarService } from "@icat/services";

export async function CarsTable() {
  const session = await auth();

  if (!session?.user?.email) return <p>Not authenticated</p>;

  const carService = new CarService();
  const response = await carService.getAll();
  const cars = response?.data;

  return <DataTable columns={carsColumns} data={cars} />;
}
