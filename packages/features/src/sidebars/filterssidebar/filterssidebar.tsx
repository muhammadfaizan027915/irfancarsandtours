import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@icat/ui/components/sheet";
import { Button } from "@icat/ui/components/button";
import { FiltersBar } from "@icat/features/filtersbar";
import { Filter } from "lucide-react";

export function FiltersSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"lg"} variant={"ghost"} className="shadow-none">
          <Filter /> Apply Filters
        </Button>
      </SheetTrigger>
      <SheetClose />
      <SheetContent side="left" className="p-4 overflow-y-auto">
        <SheetTitle>Apply Filters</SheetTitle>
        <FiltersBar />
      </SheetContent>
    </Sheet>
  );
}
