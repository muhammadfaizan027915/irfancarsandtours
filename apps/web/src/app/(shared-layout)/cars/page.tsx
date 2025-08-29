import { Searchbar, SecondaryHero } from "@icat/features";

export default function CarsPage() {
  return (
    <>
      <SecondaryHero
        title="Find Your Perfect Car"
        subtitle="Search and find your best car rental with easy way"
        badge="Find cars for sale and for rent near you"
      />
      <Searchbar defaultTab="cars" />
    </>
  );
}
