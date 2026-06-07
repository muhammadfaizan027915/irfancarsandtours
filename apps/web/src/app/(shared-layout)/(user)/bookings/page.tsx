import { redirect } from "next/navigation";
import { NavigationUrls } from "@icat/features/common/header/header.constants";

export default function BookingsIndexPage() {
  redirect(NavigationUrls.BOOKINGS_CARS);
}
