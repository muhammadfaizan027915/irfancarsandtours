import { DashboardSidebar } from "@icat/features/dashboard/sidebar";
import { DashboardHeader } from "@icat/features/dashboard/header";
import { SidebarProvider, SidebarInset } from "@icat/ui/components/sidebar";
import { requireAdmin } from "@icat/lib/auth";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  await requireAdmin();
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="p-6 overflow-y-auto ">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
