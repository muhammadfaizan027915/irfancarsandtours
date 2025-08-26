import { Logo } from "@icat/features";
import { UserRound, LayoutGrid } from "lucide-react";
import { cn } from "@icat/ui/lib/utils";

import { HeaderProps } from "./header.types";
import { Button } from "@icat/ui";

// border-border bg-primary/20 backdrop-blur-md

export function Header({ varient = "primary" }: HeaderProps) {
  return (
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
            <a>Home</a>
            <a>Cars</a>
            <a>Tours</a>
            <a>About</a>
            <a>Contact</a>
          </nav>
        </div>
        <div className="w-2/8 flex items-stretch justify-end gap-2">
          <Button
            size={"lg"}
            variant={"ghost"}
            className="hover:bg-primary hover:text-primary-foreground hover:dark:bg-primary hover:dark:text-primary-foreground"
          >
            <UserRound size={18} className="inline" /> Sign in
          </Button>
          <a className="flex items-center gap-2 text-sm"></a>

          <Button size={"lg"} className="shadow-none">
            <LayoutGrid />
          </Button>
        </div>
      </div>
    </header>
  );
}
