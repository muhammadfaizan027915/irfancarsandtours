import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@icat/ui";
import { DashboardSidebarNavigation } from "./sidebarnavigation";
import { DashboardSidebarFooter } from "./sidebarfooter/sidebarfooter";

export function DashboardSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <h1 className="text-4xl">ICAT</h1>
      </SidebarHeader>
      <SidebarSeparator className="my-4" />
      <SidebarContent>
        <DashboardSidebarNavigation />
      </SidebarContent>
      <SidebarFooter>
        <DashboardSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
