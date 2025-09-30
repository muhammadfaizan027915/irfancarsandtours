"use server";

import { Logo } from "./logo";
import { Button } from "@icat/ui";
import { NavigationUrls } from "./header.constants";
import { UserRound, LogOut } from "lucide-react";
import { lougOutUser } from "@icat/web/actions";
import { HeaderProps } from "./header.types";
import { CarCartSidebar } from "../sidebars";
import { cn } from "@icat/ui/lib/utils";
import { auth } from "@icat/lib";

import Link from "next/link";

// border-border bg-primary/20 backdrop-blur-md

export async function Header({ varient = "primary" }: HeaderProps) {
  const session = await auth();
  const sessionUser = session?.user;

  return (
    <>
      <header
        className={cn(
          "px-4 py-2 border-b",
          varient === "primary"
            ? "text-background dark:text-foreground border-muted/50 dark:border-sidebar-foreground/50"
            : ""
        )}
      >
        <div className="h-16 flex items-center">
          <div className="w-2/8">
            <Logo />
          </div>
          <div className="w-4/8">
            <nav className="flex items-stretch gap-8">
              <Link href={NavigationUrls.HOME}>Home</Link>
              <Link href={NavigationUrls.CARS}>Cars</Link>
              <a>Tours</a>
              <Link href={NavigationUrls.ABOUT_US}>About Us</Link>
              <Link href={NavigationUrls.CONTACT}>Contact</Link>
            </nav>
          </div>
          <div className="w-2/8 flex items-stretch justify-end gap-2">
            {session?.user?.id ? (
              <>
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
              </>
            ) : (
              <Button
                asChild
                size={"lg"}
                variant={"ghost"}
                className="hover:bg-primary hover:text-primary-foreground hover:dark:bg-primary hover:dark:text-primary-foreground"
              >
                <Link href={NavigationUrls.SIGNIN}>
                  <UserRound size={18} className="inline" /> Sign in
                </Link>
              </Button>
            )}
            <CarCartSidebar />
          </div>
        </div>
      </header>
    </>
  );
}
