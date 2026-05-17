import { Suspense } from "react";
import { CheckoutContent, CheckoutContentSkeleton } from "@icat/features/contents/checkout";

export default async function CheckoutPage() {
  return (
    <>
      <Suspense fallback={<CheckoutContentSkeleton />}>
        <CheckoutContent />
      </Suspense>
    </>
  );
}
