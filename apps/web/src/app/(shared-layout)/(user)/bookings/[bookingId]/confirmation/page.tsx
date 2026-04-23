import { NavigationUrls } from "@icat/features/header/header.constants";
import { getUserBooking } from "@icat/web/data/bookings";
import { redirect } from "next/navigation";

import dynamic from "next/dynamic";
import { Skeleton } from "@icat/ui/components/skeleton";

const BookingConfirmation = dynamic(
  () =>
    import("@icat/features/booking/confirmation").then(
      (m) => m.BookingConfirmation
    ),
  {
    loading: () => <Skeleton className="h-[600px] w-full max-w-2xl mx-auto rounded-xl" />,
  }
);

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
