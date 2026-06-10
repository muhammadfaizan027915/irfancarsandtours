"use client";

import { usePathname } from "next/navigation";
import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { BookingsHeader } from "@icat/features/common/bookings-header";

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Car Bookings",
      href: NavigationUrls.BOOKINGS_CARS,
      isActive: !pathname.includes(NavigationUrls.TOURS),
    },
    {
      label: "Tour Bookings",
      href: NavigationUrls.BOOKINGS_TOURS,
      isActive: pathname.includes(NavigationUrls.TOURS),
    },
  ];

  return (
    <div className="space-y-6 container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
      </div>

      <BookingsHeader tabs={tabs} />
      <div className="mt-6">{children}</div>
    </div>
  );
}
