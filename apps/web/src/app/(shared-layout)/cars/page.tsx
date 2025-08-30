import { Searchbar, SecondaryHero } from "@icat/features";

export default function CarsPage() {
  return (
    <>
      <SecondaryHero
        title="Find Your Perfect Car"
        subtitle="Search and find your best car rental with easy way"
        badge="Find cars for sale and for rent near you"
      />
      <div className="container mx-auto px-4 md:px-8">
        <Searchbar defaultTab="cars" />
      </div>
    </>
  );
}
