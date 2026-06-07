import { Suspense } from "react";
import { TourCheckoutContent, TourCheckoutContentSkeleton } from "@icat/features/contents/checkout";

export default async function TourCheckoutPage() {
  return (
    <>
      <Suspense fallback={<TourCheckoutContentSkeleton />}>
        <TourCheckoutContent />
      </Suspense>
    </>
  );
}
