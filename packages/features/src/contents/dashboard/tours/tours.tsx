import { GetToursBodyDto } from "@icat/contracts";
import { ToursTable } from "@icat/features/dashboard/tables/tourstable/tourstable";
import { getTours } from "@icat/web/data/tours";

type DashboardToursContentProps = {
  searchParams: GetToursBodyDto;
};

export async function DashboardToursContent({
  searchParams,
}: DashboardToursContentProps) {
  const result = await getTours(searchParams);
  const tours = result.data;
  const pagination = result.pagination;

  return <ToursTable tours={tours} pagination={pagination} />;
}
