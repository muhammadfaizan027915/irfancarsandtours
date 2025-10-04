import { NavigationUrls, BookingConfirmation } from "@icat/features";
import { BookingService } from "@icat/services";
import { redirect } from "next/navigation";

type BookingConfirmationPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function BookingConfirmationPage({
  params,
}: BookingConfirmationPageProps) {
  const { bookingId } = await params;

  const bookingService = new BookingService();
  const booking = await bookingService.getBookingById(bookingId);

  if (!booking) {
    redirect(NavigationUrls.HOME);
  }

  return <BookingConfirmation booking={booking} />;
}
