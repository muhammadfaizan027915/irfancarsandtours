import { NavigationUrls, BookingConfirmation } from "@icat/features";
import { getUserBooking } from "@icat/web/data/bookings";
import { redirect } from "next/navigation";

type BookingConfirmationPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function BookingConfirmationPage({
  params,
}: BookingConfirmationPageProps) {
  const { bookingId } = await params;

  const booking = await getUserBooking(bookingId);

  if (!booking) {
    redirect(NavigationUrls.HOME);
  }

  return <BookingConfirmation booking={booking} />;
}
