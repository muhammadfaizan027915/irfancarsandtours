import { GetTourBookingsBodyDto } from "@icat/contracts";
import { TourBookingsTable } from "@icat/features/dashboard/tables/tourbookingstable/tourbookingstable";
import { getTourBookings } from "@icat/web/data/tours";

type DashboardTourBookingsContentProps = {
  searchParams: GetTourBookingsBodyDto;
};

export async function DashboardTourBookingsContent({
  searchParams,
}: DashboardTourBookingsContentProps) {
  const result = await getTourBookings(searchParams);

  return <TourBookingsTable tourBookings={result.data} pagination={result.pagination} />;
}
