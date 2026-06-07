import { GetToursBodyDto } from "@icat/contracts";
import { FiltersSidebar } from "@icat/features/common/sidebars/filterssidebar";
import { ToursFiltersBar } from "@icat/features/filtersbars";
import { FiltersClearer } from "@icat/features/filtersclearer";
import { Tours } from "@icat/features/tours";
import { PaginationBar } from "@icat/ui/components/pagination";
import { PaginationInfo } from "@icat/ui/components/pagination-info";
import { getTours } from "@icat/web/data/tours";

type ToursContentProps = {
  searchParams: GetToursBodyDto;
};

export async function ToursContent({ searchParams }: ToursContentProps) {
  const result = await getTours(searchParams);
  const tours = result.data;
  const pagination = result.pagination;

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2 w-full border-b pb-4">
        <div className="xl:hidden">
          <FiltersSidebar>
            <ToursFiltersBar />
          </FiltersSidebar>
        </div>
        <PaginationInfo pagination={pagination} label="tours" />
        <FiltersClearer />
      </div>
      <Tours tours={tours} />
      <PaginationBar
        pagination={{ ...pagination, limit: searchParams.limit }}
      />
    </div>
  );
}
