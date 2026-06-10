import { Filter } from "lucide-react";

import { Button } from "@icat/ui/components/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@icat/ui/components/sheet";

type FiltersSidebarProps = {
  children: React.ReactNode;
};

export function FiltersSidebar({ children }: FiltersSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"lg"} variant={"ghost"}>
          <Filter /> Apply Filters
        </Button>
      </SheetTrigger>
      <SheetClose />
      <SheetContent side="left" className="p-4 overflow-y-auto">
        <SheetTitle>Apply Filters</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
}
