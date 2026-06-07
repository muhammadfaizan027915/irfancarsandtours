import { Suspense } from "react";
import { DashboardTourBookingDetailContent, DashboardTourBookingDetailContentSkeleton } from "@icat/features/contents/dashboard/tourbookingdetail";

type TourBookingDetailPageProps = {
  params: Promise<{ tourBookingId: string }>;
};

export default async function TourBookingDetailPage({
  params,
}: TourBookingDetailPageProps) {
  const { tourBookingId } = await params;

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-3xl font-semibold tracking-tight">Tour Booking Details</h1>
      <Suspense fallback={<DashboardTourBookingDetailContentSkeleton />}>
        <DashboardTourBookingDetailContent tourBookingId={tourBookingId} />
      </Suspense>
    </div>
  );
}
