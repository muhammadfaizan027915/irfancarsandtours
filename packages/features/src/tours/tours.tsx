import { TourCard } from "./tourcard/tourcard";
import { ToursProps } from "./tours.types";

export async function Tours({ tours }: ToursProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {tours.map((tour) => (
        <TourCard tour={tour} key={tour.id} />
      ))}
    </div>
  );
}
