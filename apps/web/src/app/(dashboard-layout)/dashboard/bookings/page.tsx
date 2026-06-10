import { redirect } from "next/navigation";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";

export default function DashboardBookingsIndexPage() {
  redirect(DashboardNavigationUrls.BOOKINGS_CARS);
}
