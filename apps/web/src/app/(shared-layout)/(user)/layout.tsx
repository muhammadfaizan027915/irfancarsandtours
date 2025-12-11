"use client";

import { Tabs, TabsList, TabsTrigger } from "@icat/ui/components/tabs";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";

type UserLayoutProps = {
  children: ReactNode;
};

export default function SharedLayout({ children }: UserLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-8">
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

      <div className="p-4">{children}</div>
    </div>
  );
}
