import { Card, CardContent } from "@icat/ui/components/card";
import { Button } from "@icat/ui/components/button";
import { CarPropertiesProps } from "./properties.types";
import { Armchair, CarFront, Cog, Fuel } from "lucide-react";

export function CarProperties({
  fuelType,
  carType,
  transmissionType,
  seatingCapacity,
}: CarPropertiesProps) {
  return (
    <Card className="shadow-none rounded-xl">
      <CardContent className=" flex flex-row gap-4">
        <Button
          size="lg"
          className="shadow-none rounded-lg py-7 bg-accent flex-1 pointer-events-none font-semibold"
          variant="outline"
        >
          <CarFront className="inline mr-1" /> {carType}
        </Button>
        <Button
          size="lg"
          className="shadow-none rounded-lg py-7 bg-accent flex-1 pointer-events-none font-semibold"
          variant="outline"
        >
          <Cog className="inline mr-1" /> {transmissionType}
        </Button>
        <Button
          size="lg"
          className="shadow-none rounded-lg py-7 bg-accent flex-1 pointer-events-none font-semibold"
          variant="outline"
        >
          <Fuel className="inline mr-1" /> {fuelType}
        </Button>
        <Button
          size="lg"
          className="shadow-none rounded-lg py-7 bg-accent flex-1 pointer-events-none font-semibold"
          variant="outline"
        >
          <Armchair className="inline mr-1" /> {seatingCapacity} Seats
        </Button>
      </CardContent>
    </Card>
  );
}
