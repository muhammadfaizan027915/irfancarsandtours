import { Suspense } from "react";
import { TourBookingDetailContent } from "@icat/features/contents/tourbookingdetail";
import { BookingDetailContentSkeleton } from "@icat/features/contents/bookingdetail";

type UserTourBookingDetailPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function UserTourBookingDetailPage({
  params,
}: UserTourBookingDetailPageProps) {
  const { bookingId } = await params;

  return (
    <Suspense fallback={<BookingDetailContentSkeleton />}>
      <TourBookingDetailContent bookingId={bookingId} />
    </Suspense>
  );
}
