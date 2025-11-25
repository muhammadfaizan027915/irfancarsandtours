import { UserRound, LogOut, LayoutDashboard } from "lucide-react";
import { lougOutUser } from "@icat/web/actions";
import { getSessionUser } from "@icat/web/data/uesrs";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { Button } from "@icat/ui/components/button";
import { ProfileSigninProps } from "./profilesignin.types";
import { UserRolesList } from "@icat/database";
import { cn } from "@icat/ui/lib/utils";
import Link from "next/link";

export async function ProfileSigin({ className }: ProfileSigninProps) {
  const sessionUser = await getSessionUser();

  return sessionUser?.id ? (
    <div className={cn("flex gap-4", className)}>
      {sessionUser?.role === UserRolesList[0] && <Button asChild size={"lg"} variant={"ghost"}>
        <Link href={NavigationUrls.BOOKINGS}>
          <LayoutDashboard size={18} className="inline" /> Dashboard
        </Link>
      </Button>}

      <Button asChild size={"lg"} variant={"ghost"}>
        <Link href={NavigationUrls.PROFILE}>
          <UserRound size={18} className="inline" />{" "}
          {sessionUser?.name?.split(" ")?.[0] || "Profile"}
        </Link>
      </Button>

      <form action={lougOutUser}>
        <Button size={"lg"} variant={"ghost"}>
          <LogOut size={18} className="inline" /> Logout
        </Button>
      </form>
    </div>
  ) : (
    <Button
      asChild
      size={"lg"}
      variant={"ghost"}
      className={cn(
        "hover:bg-primary hover:text-primary-foreground hover:dark:bg-primary hover:dark:text-primary-foreground",
        className
      )}
    >
      <Link href={NavigationUrls.SIGNIN}>
        <UserRound size={18} className="inline" /> Sign in
      </Link>
    </Button>
  );
}
