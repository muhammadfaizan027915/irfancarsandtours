import { redirect } from "next/navigation";
import { CarBooking, CarCartList, NavigationUrls } from "@icat/features";
import { getCartCars } from "@icat/web/data/cart";
import { CarCartItem } from "@icat/web/store";

export default async function CheckoutPage() {
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
    <>
      <h1 className="text-start text-4xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-[1fr_450px] items-start gap-6">
        <CarBooking cars={_cars} />
        <CarCartList />
      </div>
    </>
  );
}
