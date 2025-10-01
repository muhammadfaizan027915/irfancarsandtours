import { CarService } from "@icat/services";
import { CarCard } from "../cars";

export async function FeaturedCars() {
  const carService = new CarService();
  const cars = await carService.getFeaturedCars();

  if(!cars?.length) return null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-3xl font-bold">Featured Cars</h3>
        <p className="text-muted-foreground">
          Choosen and trusted by most of the people
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cars?.map((car) => (
          <CarCard car={car} key={car?.id} />
        ))}
      </div>
    </div>
  );
}
