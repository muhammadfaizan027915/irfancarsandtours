import { redirect } from "next/navigation";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";

export default function DashboardIndexPage() {
  redirect(DashboardNavigationUrls.BOOKINGS_CARS);
}
