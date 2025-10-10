import { Button } from "@icat/ui/components/button";
import { DarkModeToggler } from "@icat/ui/components/dark-mode-toggler";
import { Phone, CarFront, Mail, MoveRight } from "lucide-react";
import { TopbarProps } from "./topbar.types";
import { cn } from "@icat/ui/lib/utils";

export function Topbar({ varient = "primary" }: TopbarProps) {
  return (
    <div
      className={cn(
        "w-full items-center px-8 h-10 text-white text-sm hidden md:flex",
        "border-b border-muted/50 dark:border-sidebar-foreground/50",
        varient === "primary" ? "bg-transparent" : "bg-secondary/90"
      )}
    >
      <div className="xl:w-1/3 flex gap-8">
        <span className={"flex items-center gap-2"}>
          <Phone size={14} className="inline" />
          <a href="tel:090078601" className="hidden xl:inline">
            +0900 - 78601
          </a>
        </span>
        <span className={"flex items-center gap-2"}>
          <Mail size={14} className="inline" />
          <a href="tel:090078601" className="hidden xl:inline">
            help@irfancarsandtours.pk
          </a>
        </span>
      </div>
      <div className="flex-1 flex justify-center items-center gap-2">
        <CarFront size={22} className="inline text-primary" />
        <p className="text-white text-center">
          Your choice — explore special cars today.
        </p>
        <Button size="sm" className="rounded-full h-7">
          Access Now <MoveRight />
        </Button>
      </div>
      <div className="xl:w-1/3 flex justify-end items-center gap-2">
        <hr className="h-10 border-l border-muted/50 dark:border-sidebar-foreground/50 mx-4" />
        <DarkModeToggler />
      </div>
    </div>
  );
}
