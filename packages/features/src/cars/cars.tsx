import { CarCard } from "./carcard";
import { CarsProps } from "./cars.types";
import { getUserCars } from "@icat/web/data/cars";
import { PaginationBar } from "@icat/ui";

export async function Cars(props: CarsProps) {
  const result = await getUserCars(props);
  const cars = result.data;
  const pagination = result.pagination;

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars?.map((car) => (
          <CarCard car={car} key={car.id} />
        ))}
      </div>
      <PaginationBar pagination={{ ...pagination, limit: props.limit }} />
    </div>
  );
}
