import { redirect } from "next/navigation";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { getCartCars } from "@icat/web/data/cart";
import { CarCartItem } from "@icat/web/store";
import dynamic from "next/dynamic";

const CarCartList = dynamic(() =>
  import("@icat/features/carcartlist").then((m) => m.CarCartList)
);

const CarBooking = dynamic(() =>
  import("@icat/features/cardetail/booking").then((m) => m.CarBooking)
);

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
      <div className="container mx-auto grid grid-cols-[1fr_450px] items-start gap-6">
        <CarBooking cars={_cars} />
        <CarCartList />
      </div>
    </>
  );
}
