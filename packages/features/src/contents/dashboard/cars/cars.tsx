import { GetCarsBodyDto } from "@icat/contracts";
import { CarsTable } from "@icat/features/dashboard/tables/carstable";
import { getCars } from "@icat/web/data/cars";

type DashboardCarsContentProps = {
  searchParams: GetCarsBodyDto;
};

export async function DashboardCarsContent({
  searchParams,
}: DashboardCarsContentProps) {
  const result = await getCars(searchParams);
  const cars = result.data;
  const pagination = result.pagination;

  return <CarsTable cars={cars} pagination={pagination} />;
}
