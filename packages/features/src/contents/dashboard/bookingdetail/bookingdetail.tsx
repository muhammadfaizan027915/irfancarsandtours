import { BookingDetail } from "@icat/features/booking/detail";
import { BookedCarsTable } from "@icat/features/dashboard/tables/bookedcarstable";
import { notFound } from "next/navigation";
import { getBooking } from "@icat/web/data/bookings";
import { getBookedCars } from "@icat/web/data/bookedcars";

export async function DashboardBookingDetailContent({ bookingId }: { bookingId: string }) {
  const booking = await getBooking(bookingId);
  const bookedCars = await getBookedCars(bookingId);

  if (!booking) return notFound();

  return (
    <div className="flex flex-col gap-6 w-full">
      <BookingDetail booking={booking} />
      <BookedCarsTable bookedCars={bookedCars} />
    </div>
  );
}
