import { GetCarsBodyDto } from "@icat/contracts";
import { Cars } from "@icat/features/cars";
import { FiltersSidebar } from "@icat/features/common/sidebars/filterssidebar";
import { CarsFiltersBar } from "@icat/features/filtersbars";
import { FiltersClearer } from "@icat/features/filtersclearer";
import { PaginationBar } from "@icat/ui/components/pagination";
import { PaginationInfo } from "@icat/ui/components/pagination-info";
import { getUserCars } from "@icat/web/data/cars";

type CarsContentProps = {
  searchParams: GetCarsBodyDto;
};

export async function CarsContent({ searchParams }: CarsContentProps) {
  const result = await getUserCars(searchParams);
  const cars = result.data;
  const pagination = result.pagination;

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2 w-full border-b pb-4">
        <div className="xl:hidden">
          <FiltersSidebar>
            <CarsFiltersBar />
          </FiltersSidebar>
        </div>
        <PaginationInfo pagination={pagination} label="cars" />
        <FiltersClearer />
      </div>
      <Cars cars={cars} />
      <PaginationBar
        pagination={{ ...pagination, limit: searchParams.limit }}
      />
    </div>
  );
}
