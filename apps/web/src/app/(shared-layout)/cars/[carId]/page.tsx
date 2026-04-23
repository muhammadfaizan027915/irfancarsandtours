import { Suspense } from "react";
import { CarDetailContent, CarDetailContentSkeleton } from "@icat/features/contents/cardetail";

type CarDetailPageProps = {
  params: Promise<{ carId: string }>;
};

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { carId } = await params;

  return (
    <Suspense fallback={<CarDetailContentSkeleton />}>
      <CarDetailContent carId={carId} />
    </Suspense>
  );
}
