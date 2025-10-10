import { LoaderCircle } from "lucide-react";
import { Button } from "@icat/ui/components/button";
import { SliderContainer } from "@icat/ui/components/slider-container";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { CarCard } from "@icat/features/cars/carcard";
import { getMostSearchedCars } from "@icat/web/data/cars";
import Link from "next/link";

export async function SearchedCars() {
  const cars = await getMostSearchedCars();

  const settings = {
    slidesToShow: 3,
    responsive: [
      { breakpoint: 1048, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (!cars?.length) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-3xl font-bold">Most Searched Cars</h3>
        <p className="text-muted-foreground">
          Choosen and trusted by most of the people
        </p>
      </div>
      <SliderContainer settings={settings}>
        {cars?.map((car) => (
          <div key={car?.id} className="p-2">
            <CarCard car={car} />
          </div>
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
