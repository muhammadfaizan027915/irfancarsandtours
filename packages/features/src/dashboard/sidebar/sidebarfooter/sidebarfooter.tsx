import { NavigationUrls } from "@icat/features/header";
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
import { lougOutUser } from "@icat/web/actions";
import { MoreHorizontal, UserRound, LogOut } from "lucide-react";
import Link from "next/link";

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
            <DropdownMenuItem asChild>
              <Link href={NavigationUrls.PROFILE}>
                <UserRound className="text-foreground" />
                <span>Go to Profile</span>
              </Link>
            </DropdownMenuItem>
            <form action={lougOutUser}>
              <DropdownMenuItem>
                <LogOut className="text-foreground" /> Logout
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
