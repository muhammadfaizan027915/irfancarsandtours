"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@icat/ui";
import { usePathname } from "next/navigation";
import { DashboardNavigation } from "./sidebarnavigation.constants";
import Link from "next/link";

export function DashboardSidebarNavigation() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {DashboardNavigation?.map((navigation) => {
        const isActive = navigation.url === pathname;
        return (
          <SidebarMenuItem key={navigation.title}>
            <SidebarMenuButton
              asChild
              size={"lg"}
              isActive={isActive}
              className="px-4"
            >
              <Link href={navigation.url}>
                <navigation.icon />
                <span>{navigation?.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
