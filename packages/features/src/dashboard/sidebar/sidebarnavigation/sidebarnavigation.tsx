"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@icat/ui/components/sidebar";
import { cn } from "@icat/ui/lib/utils";

import { DashboardNavigation } from "./sidebarnavigation.constants";

export function DashboardSidebarNavigation() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="gap-2">
      {DashboardNavigation?.map((navigation) => {
        const isActive = pathname.startsWith(navigation.url);
        return (
          <SidebarMenuItem key={navigation.title}>
            <SidebarMenuButton
              asChild
              size={"lg"}
              isActive={isActive}
              className={cn("px-4 rounded-xl", isActive ? "shadow-md" : "")}
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
