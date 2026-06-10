import { GetTourBookingsBodyDto } from "@icat/contracts";
import { UserTourBookingsTable } from "@icat/features/tables/usertourbookingstable";
import { getUserTourBookings } from "@icat/web/data/tourbookings";

type TourBookingsContentProps = {
  searchParams: GetTourBookingsBodyDto;
};

export async function TourBookingsContent({
  searchParams,
}: TourBookingsContentProps) {
  const result = await getUserTourBookings(searchParams);

  const tourBookings = result?.data || [];
  const tourPagination = result?.pagination;

  return (
    <UserTourBookingsTable
      bookings={tourBookings}
      pagination={tourPagination}
    />
  );
}
