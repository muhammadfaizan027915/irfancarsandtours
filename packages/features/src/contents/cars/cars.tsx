import { GetCarsBodyDto } from "@icat/contracts";
import { Cars } from "@icat/features/cars";
import { FiltersClearer } from "@icat/features/filtersclearer";
import { FiltersSidebar } from "@icat/features/sidebars/filterssidebar";
import { PaginationBar } from "@icat/ui/components/pagination";
import { PaginationInfo } from "@icat/ui/components/pagination-info";
import { getUserCars } from "@icat/web/data/cars";

export async function CarsContent({ filters }: { filters: GetCarsBodyDto }) {
  const result = await getUserCars(filters);
  const cars = result.data;
  const pagination = result.pagination;

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2 w-full border-b pb-4">
        <div className="xl:hidden">
          <FiltersSidebar />
        </div>
        <PaginationInfo pagination={pagination} label="cars" />
        <FiltersClearer />
      </div>
      <Cars cars={cars} />
      <PaginationBar pagination={{ ...pagination, limit: filters.limit }} />
    </div>
  );
}
