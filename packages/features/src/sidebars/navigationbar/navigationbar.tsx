"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@icat/ui/components/sheet";
import { Button } from "@icat/ui/components/button";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { Menu } from "lucide-react";
import Link from "next/link";

export function NavigationBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"lg"}
          variant={"ghost"}
          className="shadow-none block lg:hidden"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetClose />
      <SheetContent side="left">
        <nav className="flex-1 overflow-auto flex flex-col gap-8 p-6">
          <Link href={NavigationUrls.HOME}>Home</Link>
          <Link href={NavigationUrls.CARS}>Cars</Link>
          <a>Tours</a>
          <Link href={NavigationUrls.ABOUT_US}>About Us</Link>
          <Link href={NavigationUrls.CONTACT}>Contact</Link>
        </nav>

        <SheetFooter className="flex flex-row gap-2 border-t w-full"></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
