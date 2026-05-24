import { redirect } from "next/navigation";

import { CarCartList } from "@icat/features/carcartlist";
import { CarBooking } from "@icat/features/cardetail/booking";
import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { getCartCars } from "@icat/web/data/cart";
import { CarCartItem } from "@icat/web/store";

export async function CheckoutContent() {
  const cars = await getCartCars();

  if (cars?.length === 0) {
    redirect(NavigationUrls.HOME);
  }

  const _cars = cars?.map((car: CarCartItem) => ({
    carId: car?.id,
    quantity: car?.quantity,
    bookedWithDriver: car?.bookedWithDriver,
  }));

  return (
    <div className="container mx-auto">
      <h1 className="text-start text-4xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] items-start gap-6">
        <CarBooking cars={_cars} />
        <CarCartList />
      </div>
    </div>
  );
}
