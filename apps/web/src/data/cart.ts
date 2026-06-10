import { cookies } from "next/headers";
import { carCartKey, tourCartKey } from "@icat/web/store";

export async function getCartCars() {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(carCartKey);
  const cart = cartCookie ? JSON.parse(cartCookie.value) : [];
  const carsList = cart?.carsList ?? [];
  return carsList;
}

export async function getCartTours() {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(tourCartKey);
  const cart = cartCookie ? JSON.parse(cartCookie.value) : [];
  const toursList = cart?.toursList ?? [];
  return toursList;
}
