import { Map } from "lucide-react";

import { EmptyMessage } from "@icat/ui/components/empty-message";
import { TourCard } from "./tourcard/tourcard";
import { ToursProps } from "./tours.types";

export async function Tours({ tours }: ToursProps) {
  if (!tours?.length) {
    return <EmptyMessage icon={Map} message="No tours available at the moment." className="py-20" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {tours.map((tour) => (
        <TourCard tour={tour} key={tour.id} />
      ))}
    </div>
  );
}
