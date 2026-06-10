import { FeaturedCars } from "@icat/features/sliders/featuredcars";
import { FeaturedTours } from "@icat/features/sliders/featuredtours";
import { SearchedCars } from "@icat/features/sliders/searchedcars";

export function HomeFeaturedCars() {
  return <FeaturedCars />;
}

export function HomeSearchedCars() {
  return <SearchedCars />;
}

export function HomeFeaturedTours() {
  return <FeaturedTours />;
}
