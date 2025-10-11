import { BrandNamesList } from "@icat/database";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";
import { Button } from "@icat/ui/components/button";
import { GenericSelect } from "@icat/ui/components/select";
import { CarSerachProps } from "@icat/features/searchbar/searchbar.types";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { Search } from "lucide-react";
import Form from "next/form";

export function CarSearchbar({ search, brand }: CarSerachProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-4xl font-bold">
        Begin by <span className="text-primary">searching</span> for a car.
      </h1>
      <Form
        action={NavigationUrls.CARS}
        className="w-full flex items-end gap-4 rounded-2xl flex-col lg:flex-row"
      >
        <div className="space-y-2 flex-1 w-full">
          <Label className="font-bold text-muted-foreground" htmlFor="search">
            Search
          </Label>
          <Input
            id="search"
            name="search"
            placeholder="Search car here..."
            className="h-12 md:h-16 rounded-xl"
            defaultValue={search}
          />
        </div>

        <div className="space-y-2 flex-1 w-full">
          <Label className="font-bold text-muted-foreground" htmlFor="brand">
            Car Brand
          </Label>
          <GenericSelect
            id="brand"
            name={"brand"}
            options={BrandNamesList}
            placeholder="Select brand name"
            className="h-12 md:h-16 rounded-xl"
            defaultValue={brand}
          />
        </div>
        <Button
          size={"lg"}
          className="h-12 md:h-16 w-full lg:max-w-48 shadow-none"
        >
          <Search /> Find Car
        </Button>
      </Form>
    </div>
  );
}
