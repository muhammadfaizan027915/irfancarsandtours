import { Button, DarkModeToggler } from "@icat/ui";
import { Phone, CarFront, Mail, MoveRight } from "lucide-react";
import { TopbarProps } from "./topbar.types";
import { cn } from "@icat/ui/lib/utils";

export function Topbar({ transparent = false }: TopbarProps) {
  return (
    <div
      className={cn(
        "w-full flex items-center px-8 h-10 text-white text-sm",
        transparent ? "bg-transparent" : "bg-secondary/90"
      )}
    >
      <div className="w-1/4 flex gap-8">
        <span className={"flex items-center gap-2"}>
          <Phone size={14} className="inline" />
          <a href="tel:090078601">+0900 - 78601</a>
        </span>
        <span className={"flex items-center gap-2"}>
          <Mail size={14} className="inline" />
          <a href="tel:090078601">help@irfancarsandtours.pk</a>
        </span>
      </div>
      <div className="flex-1 flex justify-center items-center gap-2">
        <CarFront size={22} className="inline text-primary" />
        <p className="text-white text-center">
          Your choice, your collection — explore special cars today.
        </p>
        <Button size="sm" className="rounded-full h-7">
          Access Now <MoveRight />
        </Button>
      </div>
      <div className="w-1/4 flex justify-end items-center gap-2">
        <hr className="h-10 border-l border-muted/50 dark:border-sidebar-foreground/50 mx-4" />
        <DarkModeToggler />
      </div>
    </div>
  );
}
