import { notFound } from "next/navigation";

import { TourCartList } from "@icat/features/tourcartlist";
import { TourBooking } from "@icat/features/tourdetail/booking";
import { getCartTours } from "@icat/web/data/cart";

export async function TourCheckoutContent() {
    const tours = await getCartTours();

  if (tours?.length === 0) {
    return notFound();
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-start text-4xl font-bold mb-4">Tour Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] items-start gap-6">
        <TourBooking hideNumberOfAdultsAndChildren={true} />
        <TourCartList />
      </div>
    </div>
  );
}
