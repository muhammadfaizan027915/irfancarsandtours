import { CarService } from "@icat/services";
import { CarsProps } from "./cars.types";
import { CarCard } from "./carcard";

export async function Cars({ limit, page, search }: CarsProps) {
  const carService = new CarService();
  const { data, pagination } = await carService.getAll({ limit, page, search });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.map((car) => (
        <CarCard car={car} key={car.id} />
      ))}
    </div>
  );
}
