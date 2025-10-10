"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@icat/ui/components/sidebar";
import { usePathname } from "next/navigation";
import { DashboardNavigation } from "./sidebarnavigation.constants";
import { cn } from "@icat/ui/lib/utils";
import Link from "next/link";

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
