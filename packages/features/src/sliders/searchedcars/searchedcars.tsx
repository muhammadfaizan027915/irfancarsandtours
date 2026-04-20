import { LoaderCircle } from "lucide-react";
import { Button } from "@icat/ui/components/button";
import { SliderContainer } from "@icat/ui/components/slider-container";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { CarCard } from "@icat/features/cars/carcard";
import { getMostSearchedCars } from "@icat/web/data/cars";
import Link from "next/link";

export async function SearchedCars() {
  const cars = await getMostSearchedCars();


  if (!cars?.length) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-3xl font-bold">Most Searched Cars</h3>
        <p className="text-muted-foreground">
          Choosen and trusted by most of the people
        </p>
      </div>
      <SliderContainer slidesPerView={[1, 2, 3]}>
        {cars?.map((car) => (
          <CarCard key={car?.id} car={car} />
        ))}
      </SliderContainer>
      <Button
        asChild
        size="lg"
        className="shadow-none mx-auto px-8 py-4 font-bold h-fit max-w-fit"
      >
        <Link href={NavigationUrls.CARS}>
          <LoaderCircle />
          Load More
        </Link>
      </Button>
    </div>
  );
}
