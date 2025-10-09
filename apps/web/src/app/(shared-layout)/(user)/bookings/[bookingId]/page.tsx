import { BookingDetail, UserBookedCarsTable } from "@icat/features";
import { getUserBookedCars } from "@icat/web/data/bookedcars";
import { getUserBooking } from "@icat/web/data/bookings";
import { notFound } from "next/navigation";

type UserBookingDetailPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function UserBookingDetailPage({
  params,
}: UserBookingDetailPageProps) {
  const { bookingId } = await params;
  const booking = await getUserBooking(bookingId);
  const bookedCars = await getUserBookedCars(bookingId);

  if (!booking) return notFound();

  return (
    <div className="grid gap-6">
      <BookingDetail booking={booking} />
      <UserBookedCarsTable bookedCars={bookedCars} />
    </div>
  );
}
