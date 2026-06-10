import { getCustomerById } from "@icat/web/data/users";
import { getBookingsByUserId } from "@icat/web/data/bookings";
import { GetBookingsBodyDto } from "@icat/contracts";
import { BookingsTable } from "@icat/features/dashboard/tables/bookingstable";
import { notFound } from "next/navigation";

type CustomerBookingsPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<GetBookingsBodyDto>;
};

export default async function CustomerBookingsPage({
  params,
  searchParams,
}: CustomerBookingsPageProps) {
  const { id } = await params;
  const _params = await searchParams;

  const [user, bookings] = await Promise.all([
    getCustomerById(id),
    getBookingsByUserId(id, _params),
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

  return <BookingsTable bookings={bookingsWithUser.data} pagination={bookingsWithUser.pagination} />;
}

