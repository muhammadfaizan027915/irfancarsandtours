import { notFound } from "next/navigation";

import { CarCartList } from "@icat/features/carcartlist";
import { CarBooking } from "@icat/features/cardetail/booking";
import { getCartCars } from "@icat/web/data/cart";
import { CarCartItem } from "@icat/web/store";

export async function CarCheckoutContent() {
  const cars = await getCartCars();

  if (cars?.length === 0) {
    return notFound()
  }

  const _cars = cars?.map((car: CarCartItem) => ({
    carId: car?.id,
    quantity: car?.quantity,
    bookedWithDriver: car?.bookedWithDriver,
  }));

  return (
    <div className="container mx-auto">
      <h1 className="text-start text-4xl font-bold mb-4">Car Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] items-start gap-6">
        <CarBooking cars={_cars} />
        <CarCartList />
      </div>
    </div>
  );
}
