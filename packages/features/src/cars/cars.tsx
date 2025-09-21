import { GetCarsBodySchema } from "@icat/contracts";
import { CarService } from "@icat/services";
import { CarsProps } from "./cars.types";
import { CarCard } from "./carcard";

export async function Cars(props: CarsProps) {
  
  const carService = new CarService();
  const args = GetCarsBodySchema.parse(props);
  const { data, pagination } = await carService.getAll(args);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.map((car) => (
        <CarCard car={car} key={car.id} />
      ))}
    </div>
  );
}
