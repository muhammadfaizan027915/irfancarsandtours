import { cookies } from "next/headers";
import { carCartKey } from "@icat/web/store";

export async function getCartCars() {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(carCartKey);
  const cart = cartCookie ? JSON.parse(cartCookie.value) : [];
  const carsList = cart?.carsList ?? [];
  
  return carsList;
}
