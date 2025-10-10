import { Card } from "@icat/ui";
import { SearchbarProps } from "./searchbar.types";
import { CarSearchbar } from "./carsearch";

export function Searchbar({ type = "cars", brand, search }: SearchbarProps) {
  const SearchPanel = SearchbarMap[type];

  return (
    <Card className="-translate-y-1/5 lg:-translate-y-1/2 p-6 mx-auto shadow-2xl">
      <SearchPanel type={type} brand={brand} search={search} />
    </Card>
  );
}

const SearchbarMap = {
  cars: CarSearchbar,
  tours: () => <h1>Tours</h1>,
};
