"use client";

import { Tabs, TabsList, TabsTrigger } from "@icat/ui";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";

type UserLayoutProps = {
  children: ReactNode;
};

export default function SharedLayout({ children }: UserLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="py-8">
      <Tabs defaultValue={pathname}>
        <TabsList>
          <TabsTrigger value="/bookings" className="w-20">
            <Link href={"/bookings"}>Bookings</Link>
          </TabsTrigger>
          <TabsTrigger value="/profile" className="w-20">
            <Link href={"/profile"}>Profile</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="p-4">{children}</div>
    </div>
  );
}
