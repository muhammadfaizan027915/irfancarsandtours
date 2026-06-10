import { notFound } from "next/navigation";

import { UserBookedToursTable } from "@icat/features/tables/userbookedtoursstable";
import { TourBookingDetail } from "@icat/features/tourbooking/detail";
import { getUserTourBookedTours } from "@icat/web/data/bookedtours";
import { getUserTourBooking } from "@icat/web/data/tourbookings";

type TourBookingDetailContentProps = {
  bookingId: string;
};

export async function TourBookingDetailContent({ bookingId }: TourBookingDetailContentProps) {
  const booking = await getUserTourBooking(bookingId);
  const bookedTours = await getUserTourBookedTours(bookingId);

  if (!booking) return notFound();

  return (
    <div className="grid gap-6">
      <TourBookingDetail booking={booking} />
      <UserBookedToursTable bookedTours={bookedTours} />
    </div>
  );
}
