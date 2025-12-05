import { NavigationUrls } from "@icat/features/header";
import { Button } from "@icat/ui/components/button";
import { DarkModeToggler } from "@icat/ui/components/dark-mode-toggler";
import { Phone, CarFront, Mail, MoveRight } from "lucide-react";
import { TopbarProps } from "./topbar.types";
import { cn } from "@icat/ui/lib/utils";
import Link from "next/link";
import {
  PHONE_NUMBER_1,
  EMAIL_ADDRESS,
} from "../contactdetails/contactdetails.constants";

export function Topbar({ varient = "primary" }: TopbarProps) {
  return (
    <div
      className={cn(
        "w-full items-center px-8 h-10 text-white text-sm hidden md:!flex",
        "border-b border-muted/50 dark:border-sidebar-foreground/50",
        varient === "primary" ? "bg-transparent" : "bg-secondary/90"
      )}
    >
      <div className="xl:w-1/3 flex gap-8">
        <span className={"flex items-center gap-2"}>
          <Phone size={14} className="inline" />
          <a href={`tel:${PHONE_NUMBER_1}`} className="hidden xl:!inline">
            {PHONE_NUMBER_1}
          </a>
        </span>
        <span className={"flex items-center gap-2"}>
          <Mail size={14} className="inline" />
          <a href={`mailto:${EMAIL_ADDRESS}`} className="hidden xl:!inline">
            {EMAIL_ADDRESS}
          </a>
        </span>
      </div>
      <div className="flex-1 flex justify-center items-center gap-2">
        <CarFront size={22} className="inline text-primary" />
        <p className="text-white text-center">
          Your choice — explore special cars today.
        </p>
        <Button size="sm" className="rounded-full h-7" asChild>
          <Link href={NavigationUrls.CARS}>
            Access Now <MoveRight />
          </Link>
        </Button>
      </div>
      <div className="xl:w-1/3 flex justify-end items-center gap-2">
        <hr className="h-10 border-l border-muted/50 dark:border-sidebar-foreground/50 mx-4" />
        <DarkModeToggler />
      </div>
    </div>
  );
}
