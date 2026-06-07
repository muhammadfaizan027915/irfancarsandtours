import { Search } from "lucide-react";
import Form from "next/form";

import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { TourSearchProps } from "@icat/features/common/searchbar/searchbar.types";
import { Button } from "@icat/ui/components/button";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";

export function TourSearchbar({ search, location }: TourSearchProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-4xl font-bold">
        Begin by <span className="text-primary">searching</span> for a tour.
      </h1>
      <Form
        action={NavigationUrls.TOURS}
        className="w-full flex items-end gap-4 rounded-2xl flex-col lg:flex-row"
      >
        <div className="space-y-2 flex-1 w-full">
          <Label className="font-bold text-muted-foreground" htmlFor="search">
            Search
          </Label>
          <Input
            id="search"
            name="search"
            placeholder="Search tour here..."
            className="h-12 md:h-16 rounded-xl"
            defaultValue={search}
          />
        </div>

        <div className="space-y-2 flex-1 w-full">
          <Label className="font-bold text-muted-foreground" htmlFor="location">
            Location
          </Label>
          <Input
            id="location"
            name="location"
            placeholder="Where do you want to go?"
            className="h-12 md:h-16 rounded-xl"
            defaultValue={location}
          />
        </div>
        <Button
          size={"lg"}
          className="h-12 md:h-16 w-full lg:max-w-48"
        >
          <Search /> Find Tour
        </Button>
      </Form>
    </div>
  );
}
