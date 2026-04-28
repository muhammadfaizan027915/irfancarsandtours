import { notFound } from "next/navigation";

import { BookingDetail } from "@icat/features/booking/detail";
import { UserBookedCarsTable } from "@icat/features/tables/userbookedcarstable";
import { getUserBookedCars } from "@icat/web/data/bookedcars";
import { getUserBooking } from "@icat/web/data/bookings";

export async function BookingDetailContent({ bookingId }: { bookingId: string }) {
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
