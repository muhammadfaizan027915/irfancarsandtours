"use client";

import { usePathname } from "next/navigation";

import { DarkModeToggler } from "@icat/ui/components/dark-mode-toggler";
import { SidebarTrigger } from "@icat/ui/components/sidebar";

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center gap-4 p-4 border-b border-border">
      <SidebarTrigger />
      <div className="h-full border-l border-border" />
      <h1 className="capitalize">{pathname?.replace("/", "")}</h1>

      <div className="ml-auto">
        <DarkModeToggler />
      </div>
    </header>
  );
}
