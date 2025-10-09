import { GetCarsBodyDto } from "@icat/contracts";
import { Cars, FiltersBar, Searchbar, SecondaryHero } from "@icat/features";

type CarsPageProps = {
  searchParams: Promise<GetCarsBodyDto>;
};

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const filters = await searchParams;

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
      <div className="flex flex-col gap-8 md:px-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl font-bold">Our Cars Fleet</h3>
          <p className="text-muted-foreground">Cars That Fit Your Lifestyle</p>
        </div>
        <div className="grid grid-cols-[300px_1fr] items-start gap-6">
          <FiltersBar />
          <Cars {...filters} />
        </div>
      </div>
    </>
  );
}
