import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CarBooking, CarCartList, NavigationUrls } from "@icat/features";
import { carCartKey } from "@icat/web/store";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(carCartKey);
  const cart = cartCookie ? JSON.parse(cartCookie.value) : [];

  if (!cart || cart?.carsList?.length === 0) {
    redirect(NavigationUrls.HOME);
  }

  return (
    <>
      <h1 className="text-start text-4xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-[1fr_450px] items-start gap-6">
        <CarBooking />
        <CarCartList />
      </div>
    </>
  );
}
