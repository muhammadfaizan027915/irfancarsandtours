import { Suspense } from "react";
import { CarCheckoutContent, CarCheckoutContentSkeleton } from "@icat/features/contents/checkout";

export default async function CarCheckoutPage() {
  return (
    <>
      <Suspense fallback={<CarCheckoutContentSkeleton />}>
        <CarCheckoutContent />
      </Suspense>
    </>
  );
}
