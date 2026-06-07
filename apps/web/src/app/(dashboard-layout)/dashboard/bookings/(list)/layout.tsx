import { ReactNode } from "react";
import { BookingsHeader } from "@icat/features/common/bookings-header";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";

type BookingsListLayoutProps = {
  children: ReactNode;
};

export default function BookingsListLayout({ children }: BookingsListLayoutProps) {
  const tabs = [
    {
      label: "Car Bookings",
      href: `${DashboardNavigationUrls.BOOKINGS_CARS}`,
    },
    {
      label: "Tour Bookings",
      href: `${DashboardNavigationUrls.BOOKINGS_TOURS}`,
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <BookingsHeader tabs={tabs} />
      {children}
    </div>
  );
}
