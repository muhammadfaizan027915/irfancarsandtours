import { Suspense } from "react";
import { DashboardBookingDetailContent, DashboardBookingDetailContentSkeleton } from "@icat/features/contents/dashboard/bookingdetail";

type BookingDetailPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function BookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const { bookingId } = await params;

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-3xl font-semibold tracking-tight">Booking Details</h1>
      <Suspense fallback={<DashboardBookingDetailContentSkeleton />}>
        <DashboardBookingDetailContent bookingId={bookingId} />
      </Suspense>
    </div>
  );
}
