import { DashboardSidebar, DashboardHeader } from "@icat/features";
import { SidebarProvider, SidebarInset } from "@icat/ui";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="p-6 overflow-y-auto max-h-[calc(100vh-90px)]">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
