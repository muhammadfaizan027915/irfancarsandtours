import { Suspense } from "react";
import { CheckoutContent, CheckoutContentSkeleton } from "@icat/features/contents/checkout";

export default async function CheckoutPage() {
  return (
    <>
      <h1 className="text-start text-4xl font-bold mb-4">Checkout</h1>
      <Suspense fallback={<CheckoutContentSkeleton />}>
        <CheckoutContent />
      </Suspense>
    </>
  );
}
