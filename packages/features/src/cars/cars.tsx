import { Car } from "lucide-react";

import { EmptyMessage } from "@icat/ui/components/empty-message";
import { CarCard } from "./carcard";
import { CarsProps } from "./cars.types";

export async function Cars({ cars }: CarsProps) {
  if (!cars?.length) {
    return <EmptyMessage icon={Car} message="No cars available at the moment." className="py-20" />;
  }

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard car={car} key={car.id} />
        ))}
      </div>
    </div>
  );
}
