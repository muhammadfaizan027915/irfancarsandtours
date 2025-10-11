import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@icat/ui/components/sidebar";
import { DashboardSidebarNavigation } from "./sidebarnavigation";
import { DashboardSidebarFooter } from "./sidebarfooter/sidebarfooter";
import { Logo } from "@icat/features/header/logo";

export function DashboardSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarSeparator className="mb-4" />
      <SidebarContent className="px-2">
        <DashboardSidebarNavigation />
      </SidebarContent>
      <SidebarFooter>
        <DashboardSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
