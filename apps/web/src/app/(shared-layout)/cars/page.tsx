import { SecondaryHero } from "@icat/features/hero/secondary";
import { PaginationBar } from "@icat/ui/components/pagination";
import { PaginationInfo } from "@icat/ui/components/pagination-info";
import { GetCarsBodyDto } from "@icat/contracts";
import { getUserCars } from "@icat/web/data/cars";

import dynamic from "next/dynamic";

const Searchbar = dynamic(() =>
  import("@icat/features/searchbar").then((m) => m.Searchbar)
);

const FiltersBar = dynamic(() =>
  import("@icat/features/filtersbar").then((m) => m.FiltersBar)
);

const FiltersSidebar = dynamic(() =>
  import("@icat/features/sidebars/filterssidebar").then((m) => m.FiltersSidebar)
);

const FiltersClearer = dynamic(() =>
  import("@icat/features/filtersclearer").then((m) => m.FiltersClearer)
);

const Cars = dynamic(() => import("@icat/features/cars").then((m) => m.Cars));

type CarsPageProps = {
  searchParams: Promise<GetCarsBodyDto>;
};

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const filters = await searchParams;
  const result = await getUserCars(filters);

  const cars = result.data;
  const pagination = result.pagination;

  return (
    <>
      <SecondaryHero
        title="Find Your Perfect Car"
        subtitle="Search and find your best car rental with easy way"
        badge="Find cars for sale and for rent near you"
      />
      <div className="container mx-auto px-4 md:px-8">
        <Searchbar type="cars" {...filters} />
      </div>
      <div className="flex flex-col gap-8 md:px-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl font-bold">Our Cars Fleet</h3>
          <p className="text-muted-foreground">Cars That Fit Your Lifestyle</p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] items-start xl:gap-4">
          <div className="hidden xl:block">
            <FiltersBar />
          </div>
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full border-b pb-4">
              <div className="xl:hidden">
                <FiltersSidebar />
              </div>
              <PaginationInfo pagination={pagination} label="cars"/>
              <FiltersClearer />
            </div>
            <Cars cars={cars} />
            <PaginationBar
              pagination={{ ...pagination, limit: filters.limit }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
