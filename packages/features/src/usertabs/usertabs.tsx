"use client";

import { usePathname } from "next/navigation";

import { NavigationUrls } from "@icat/features/common/header/header.constants";

import { BookingsHeader } from "../common/bookings-header";

export function UserTabs() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Bookings",
      href: NavigationUrls.BOOKINGS,
      isActive: pathname.startsWith(NavigationUrls.BOOKINGS),
    },
    {
      label: "Profile",
      href: NavigationUrls.PROFILE,
      isActive: pathname === NavigationUrls.PROFILE,
    },
  ];

  return <BookingsHeader tabs={tabs} />;
}
