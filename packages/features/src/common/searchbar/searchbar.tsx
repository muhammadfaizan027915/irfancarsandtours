import { CarFront, Map } from "lucide-react";

import { Card } from "@icat/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@icat/ui/components/tabs";

import { CarSearchbar } from "./carsearch";
import { SearchbarProps } from "./searchbar.types";
import { TourSearchbar } from "./toursearch";

export function Searchbar({
  type = "cars",
  brand,
  search,
  location,
  showTabs,
}: SearchbarProps) {
  if (showTabs) {
    return (
      <div className="-translate-y-1/5 lg:-translate-y-1/2 w-full mx-auto relative z-10">
        <Tabs defaultValue="cars" className="w-full gap-0">
          <TabsList className="bg-background p-0 h-auto flex gap-2 rounded-t-2xl rounded-b-none w-fit border-none border-transparent z-20">
            <TabsTrigger
              value="cars"
              className="rounded-b-none cursor-pointer border-b-0 text-base data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:font-bold data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground shadow-none"
            >
              <CarFront className="w-5 h-5 mr-2" /> Cars
            </TabsTrigger>
            <TabsTrigger
              value="tours"
              className="rounded-b-none cursor-pointer border-b-0 text-base data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:font-bold data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground shadow-none"
            >
              <Map className="w-5 h-5 mr-2" /> Tours
            </TabsTrigger>
          </TabsList>

          <Card className="p-6 rounded-tl-none border-none shadow-2xl relative z-10 -mt-1">
            <TabsContent
              value="cars"
              className="m-0 focus-visible:outline-none"
            >
              <CarSearchbar type="cars" brand={brand} search={search} />
            </TabsContent>
            <TabsContent
              value="tours"
              className="m-0 focus-visible:outline-none"
            >
              <TourSearchbar type="tours" search={search} location={location} />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    );
  }

  const SearchPanel = SearchbarMap[type];

  return (
    <Card className="-translate-y-1/5 lg:-translate-y-1/2 p-6 mx-auto shadow-2xl relative z-10">
      <SearchPanel
        type={type}
        brand={brand}
        search={search}
        location={location}
      />
    </Card>
  );
}

const SearchbarMap = {
  cars: CarSearchbar,
  tours: TourSearchbar,
};
