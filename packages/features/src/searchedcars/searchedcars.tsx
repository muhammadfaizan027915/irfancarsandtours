import { Button } from "@icat/ui";
import { NavigationUrls } from "../header";
import { LoaderCircle } from "lucide-react";
import { CarService } from "@icat/services";
import { CarCard } from "../cars";
import Link from "next/link";

export async function SearchedCars() {
  const carService = new CarService();
  const cars = await carService.getMostSearchedCars();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-3xl font-bold">Most Searched Cars</h3>
        <p className="text-muted-foreground">
          Choosen and trusted by most of the people
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars?.map((car) => (
          <CarCard car={car} key={car?.id} />
        ))}
      </div>
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
