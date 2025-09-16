import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuItem,
} from "@icat/ui";
import { MoreHorizontal, UserRound, LogOut } from "lucide-react";

export function DashboardSidebarFooter() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Avatar>
          <AvatarImage src="/user.png" alt="User" />
          <AvatarFallback>MF</AvatarFallback>
        </Avatar>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction>
              <MoreHorizontal />
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuItem>
              <UserRound className="text-foreground" />
              <span>Go to Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="text-foreground" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
