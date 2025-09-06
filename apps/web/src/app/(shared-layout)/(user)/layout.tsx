"use client";

import { Tabs, TabsList, TabsTrigger } from "@icat/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type UserLayoutProps = {
  children: ReactNode;
};

export default function SharedLayout({ children }: UserLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="relative h-full">
      <Tabs defaultValue={pathname} className="w-[400px]">
        <TabsList>
          <TabsTrigger value="/bookings">
            <Link href={"/bookings"}>Bookings</Link>
          </TabsTrigger>
          <TabsTrigger value="/profile">
            <Link href={"/profile"}>Profile</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="py-8">{children}</div>
    </div>
  );
}
