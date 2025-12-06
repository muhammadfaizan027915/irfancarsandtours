import { NavigationUrls } from "@icat/features/header/header.constants";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@icat/ui/components/avatar";
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuItem,
} from "@icat/ui/components/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@icat/ui/components/dropdown-menu";
import { lougOutUser } from "@icat/web/actions";
import { MoreHorizontal, UserRound, LogOut } from "lucide-react";
import { Button } from "@icat/ui/components/button";
import { getSessionUser } from "@icat/web/data/uesrs";
import { getNameInitials } from "@icat/lib";
import Link from "next/link";

export async function DashboardSidebarFooter() {
  const sessionUser = await getSessionUser();
  const nameInitials = getNameInitials(sessionUser?.name);

  if (!sessionUser) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Avatar>
          <AvatarImage
            className="object-cover"
            src={sessionUser.image || ""}
            alt="User"
          />
          <AvatarFallback>{nameInitials}</AvatarFallback>
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
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  className="w-full rounded-sm justify-start"
                  size="icon"
                >
                  <LogOut className="text-foreground" /> Logout
                </Button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
