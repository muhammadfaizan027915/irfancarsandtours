import { Calendar, Info, Users } from "lucide-react";

import { Button } from "@icat/ui/components/button";
import { Card, CardContent } from "@icat/ui/components/card";

import { TourPropertiesProps } from "./properties.types";

export function TourProperties({
  startDate,
  maxCapacity,
  location,
}: TourPropertiesProps) {
  return (
    <Card className="shadow-none rounded-xl">
      <CardContent className="flex flex-row flex-wrap gap-4">
        <Button
          size="lg"
          className="rounded-lg py-7 bg-accent flex-1 pointer-events-none font-semibold"
          variant="outline"
        >
          <Calendar className="inline mr-1" /> {startDate.toLocaleDateString()}
        </Button>
        <Button
          size="lg"
          className="rounded-lg py-7 bg-accent flex-1 pointer-events-none font-semibold"
          variant="outline"
        >
          <Users className="inline mr-1" /> {maxCapacity} People
        </Button>
        <Button
          size="lg"
          className="rounded-lg py-7 bg-accent flex-1 pointer-events-none font-semibold"
          variant="outline"
        >
          <Info className="inline mr-1" /> {location}
        </Button>
      </CardContent>
    </Card>
  );
}
