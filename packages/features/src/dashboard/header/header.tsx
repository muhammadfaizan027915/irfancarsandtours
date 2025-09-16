"use client";

import { SidebarTrigger } from "@icat/ui";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center gap-4 p-4 border-b border-border">
      <SidebarTrigger />
      <div className="h-full border-l border-border" />
      <h1 className="capitalize">{pathname?.replace("/", "")}</h1>
    </header>
  );
}
