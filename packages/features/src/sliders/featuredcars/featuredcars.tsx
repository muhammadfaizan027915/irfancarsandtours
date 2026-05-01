import { CarCard } from "@icat/features/cars/carcard";
import { SliderContainer } from "@icat/ui/components/slider-container";
import { getFeaturedCars } from "@icat/web/data/cars";

export async function FeaturedCars() {
  const cars = await getFeaturedCars();
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
          <CarCard key={car?.id} car={car} />
        ))}
      </SliderContainer>
    </div>
  );
}
