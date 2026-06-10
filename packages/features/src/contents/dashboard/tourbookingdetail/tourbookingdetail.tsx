import { notFound } from "next/navigation";

import { BookedToursTable } from "@icat/features/dashboard/tables/bookedtourstable";
import { TourBookingDetail } from "@icat/features/tourbooking/detail";
import { getBookedTours } from "@icat/web/data/bookedtours";
import { getTourBookingByIdWithUser } from "@icat/web/data/tours";

type DashboardTourBookingDetailContentProps = {
  tourBookingId: string;
};

export async function DashboardTourBookingDetailContent({
  tourBookingId,
}: DashboardTourBookingDetailContentProps) {
  const booking = await getTourBookingByIdWithUser(tourBookingId);
  const bookedTours = await getBookedTours(tourBookingId);

  if (!booking) return notFound();

  return (
    <div className="flex flex-col gap-6 w-full">
      <TourBookingDetail booking={booking} />
      <BookedToursTable bookedTours={bookedTours} />
    </div>
  );
}
