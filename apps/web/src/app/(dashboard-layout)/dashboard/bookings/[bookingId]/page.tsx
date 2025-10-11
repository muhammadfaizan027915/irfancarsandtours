import { BookingDetail } from "@icat/features/booking/detail";
import { BookedCarsTable } from "@icat/features/dashboard/tables/bookedcarstable";
import { notFound } from "next/navigation";
import { getBooking } from "@icat/web/data/bookings";
import { getBookedCars } from "@icat/web/data/bookedcars";

type BookingDetailPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function BookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const { bookingId } = await params;

  const booking = await getBooking(bookingId);
  const bookedCars = await getBookedCars(bookingId);

  if (!booking) return notFound();

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-3xl font-semibold tracking-tight">Booking Details</h1>
      <BookingDetail booking={booking} />
      <BookedCarsTable bookedCars={bookedCars} />
    </div>
  );
}
