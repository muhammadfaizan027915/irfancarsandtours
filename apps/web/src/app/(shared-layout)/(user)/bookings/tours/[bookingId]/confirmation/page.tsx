import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { getUserTourBooking } from "@icat/web/data/tourbookings";
import { redirect } from "next/navigation";

import dynamic from "next/dynamic";
import { Skeleton } from "@icat/ui/components/skeleton";

const TourBookingConfirmation = dynamic(
  () =>
    import("@icat/features/tourbooking/confirmation").then(
      (m) => m.TourBookingConfirmation
    ),
  {
    loading: () => <Skeleton className="h-[600px] w-full max-w-2xl mx-auto rounded-xl" />,
  }
);

type TourBookingConfirmationPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function TourBookingConfirmationPage({
  params,
}: TourBookingConfirmationPageProps) {
  const { bookingId } = await params;

  const booking = await getUserTourBooking(bookingId);

  if (!booking) {
    redirect(NavigationUrls.HOME);
  }

  return <TourBookingConfirmation booking={booking} />;
}
