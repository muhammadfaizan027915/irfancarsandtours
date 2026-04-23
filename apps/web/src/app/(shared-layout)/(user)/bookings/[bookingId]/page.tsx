import { Suspense } from "react";
import { BookingDetailContent, BookingDetailContentSkeleton } from "@icat/features/contents/bookingdetail";

type UserBookingDetailPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function UserBookingDetailPage({
  params,
}: UserBookingDetailPageProps) {
  const { bookingId } = await params;

  return (
    <Suspense fallback={<BookingDetailContentSkeleton />}>
      <BookingDetailContent bookingId={bookingId} />
    </Suspense>
  );
}
