import { DashboardSidebar } from "@icat/features/dashboard/sidebar";
import { DashboardHeader } from "@icat/features/dashboard/header";
import { SidebarProvider, SidebarInset } from "@icat/ui/components/sidebar";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {

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
