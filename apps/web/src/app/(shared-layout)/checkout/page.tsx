import { redirect } from "next/navigation";
import { NavigationUrls } from "@icat/features/common/header/header.constants";

export default function CheckoutIndexPage() {
  redirect(NavigationUrls.CHECKOUT_CARS);
}
