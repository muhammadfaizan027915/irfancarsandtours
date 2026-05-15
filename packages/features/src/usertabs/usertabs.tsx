"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavigationUrls } from "@icat/features/header/header.constants";
import { Tabs, TabsList, TabsTrigger } from "@icat/ui/components/tabs";

export function UserTabs() {
  const pathname = usePathname();

  return (
    <Tabs defaultValue={pathname}>
      <TabsList>
        <TabsTrigger value={NavigationUrls.BOOKINGS} className="w-20">
          <Link href={NavigationUrls.BOOKINGS}>Bookings</Link>
        </TabsTrigger>
        <TabsTrigger value={NavigationUrls.PROFILE} className="w-20">
          <Link href={NavigationUrls.PROFILE}>Profile</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
