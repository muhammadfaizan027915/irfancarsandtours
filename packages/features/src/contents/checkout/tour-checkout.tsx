import { notFound } from "next/navigation";

import { TourCartList } from "@icat/features/tourcartlist";
import { TourBooking } from "@icat/features/tourdetail/booking";
import { getCartTours } from "@icat/web/data/cart";
import { TourCartItem } from "@icat/web/store";

export async function TourCheckoutContent() {
  const tours = await getCartTours();

  if (tours?.length === 0) {
    return notFound();
  }

  const _tours = tours?.map((tour: TourCartItem) => ({
    tourId: tour?.id,
    adultsNumber: tour?.adults,
    childrenNumber: tour?.children,
  }));

  return (
    <div className="container mx-auto">
      <h1 className="text-start text-4xl font-bold mb-4">Tour Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] items-start gap-6">
        <TourBooking tours={_tours} hideNumberOfAdultsAndChildren />
        <TourCartList />
      </div>
    </div>
  );
}
