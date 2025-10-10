import { BookingConfirmation } from "@icat/features/booking/confirmation";
import { NavigationUrls } from "@icat/features/header/header.constants";
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
