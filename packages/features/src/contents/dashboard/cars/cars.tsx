import { GetCarsBodyDto } from "@icat/contracts";
import { getCars } from "@icat/web/data/cars";
import { CarsTable } from "@icat/features/dashboard/tables/carstable";

export async function DashboardCarsContent({ searchParams }: { searchParams: GetCarsBodyDto }) {
  const result = await getCars(searchParams);
  const cars = result.data;
  const pagination = result.pagination;

  return <CarsTable cars={cars} pagination={pagination} />;
}
