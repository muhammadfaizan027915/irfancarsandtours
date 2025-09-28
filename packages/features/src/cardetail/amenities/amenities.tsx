"use client";

import { ChevronUp } from "lucide-react";
import { useDisclosure } from "@icat/lib/hooks";
import {
  Button,
  Card,
  CardContent,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@icat/ui";
import { CarAmenitiesProps } from "./amenities.types";

export function CarAmenities({ amenities }: CarAmenitiesProps) {
  const [open, onOpen, onClose] = useDisclosure(true);
  
  return (
    <Card className="shadow-none rounded-xl">
      <CardContent className="flex flex-row gap-4">
        <Collapsible
          open={open}
          onOpenChange={open ? onClose : onOpen}
          className="w-full"
        >
          <CollapsibleTrigger className="flex w-full items-center">
            <h1 className="text-start text-2xl font-bold flex-1">Amenities</h1>
            <ChevronUp
              className={`${
                open ? "rotate-180" : "rotate-0"
              } transition-transform duration-500`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-wrap gap-2  mt-4">
            {amenities?.map((amenity, i) => (
              <Button
                size="lg"
                className="shadow-none rounded-lg bg-accent flex-1 pointer-events-none font-semibold basis-20"
                variant="outline"
                key={i}
              >
                {amenity}
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
