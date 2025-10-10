import { Logo } from "./logo";
import { HeaderProps } from "./header.types";
import { NavigationUrls } from "./header.constants";
import { ProfileSigin } from "@icat/features/profilesignin";
import { cn } from "@icat/ui/lib/utils";

import Link from "next/link";
import dynamic from "next/dynamic";

const CarCartSidebar = dynamic(() =>
  import("@icat/features/sidebars/carcartsidebar").then((m) => m.CarCartSidebar)
);

const NavigationBar = dynamic(() =>
  import("@icat/features/sidebars/navigationbar").then((m) => m.NavigationBar)
);

export async function Header({ varient = "primary" }: HeaderProps) {
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
        <div className="h-16 flex justify-between items-center w-full">
          <div className="lg:w-2/8">
            <Logo />
          </div>
          <div className="lg:w-4/8 hidden lg:block">
            <nav className="flex items-stretch gap-8">
              <Link href={NavigationUrls.HOME}>Home</Link>
              <Link href={NavigationUrls.CARS}>Cars</Link>
              <a>Tours</a>
              <Link href={NavigationUrls.ABOUT_US}>About Us</Link>
              <Link href={NavigationUrls.CONTACT}>Contact</Link>
            </nav>
          </div>
          <div className="lg:w-2/8 flex items-stretch justify-end gap-2">
            <ProfileSigin className="hidden md:flex" />
            <CarCartSidebar />
            <NavigationBar />
          </div>
        </div>
      </header>
    </>
  );
}
