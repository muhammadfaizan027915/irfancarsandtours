import { getCustomerById } from "@icat/web/data/users";
import { getTourBookingsByUserId } from "@icat/web/data/tourbookings";
import { GetTourBookingsBodyDto } from "@icat/contracts";
import { notFound } from "next/navigation";
import { TourBookingsTable } from "@icat/features/dashboard/tables/tourbookingstable";

type CustomerTourBookingsPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<GetTourBookingsBodyDto>;
};

export default async function CustomerTourBookingsPage({
  params,
  searchParams,
}: CustomerTourBookingsPageProps) {
  const { id } = await params;
  const _params = await searchParams;

  const [user, bookings] = await Promise.all([
    getCustomerById(id),
    getTourBookingsByUserId(id, _params),
  ]);

  if (!user) {
    return notFound();
  }

  const bookingsWithUser = {
    ...bookings,
    data: bookings.data.map((booking) => ({
      ...booking,
      bookedBy: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        cnic: user.cnic,
        image: user.image,
      },
    })),
  };

  return <TourBookingsTable tourBookings={bookingsWithUser.data} pagination={bookingsWithUser.pagination} />;
}
