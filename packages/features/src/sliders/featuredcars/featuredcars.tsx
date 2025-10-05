import { CarCard } from "../../cars";
import { CarService } from "@icat/services";
import { SliderContainer } from "@icat/ui";

export async function FeaturedCars() {
  const carService = new CarService();
  const cars = await carService.getFeaturedCars();

  if (!cars?.length) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-3xl font-bold">Featured Cars</h3>
        <p className="text-muted-foreground">
          Choosen and trusted by most of the people
        </p>
      </div>
      <SliderContainer>
        {cars?.map((car) => (
          <div key={car?.id} className="p-2">
            <CarCard car={car} />
          </div>
        ))}
      </SliderContainer>
    </div>
  );
}
