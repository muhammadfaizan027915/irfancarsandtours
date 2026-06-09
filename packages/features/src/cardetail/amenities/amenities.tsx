"use client";

import { ChevronUp, Info } from "lucide-react";

import { useDisclosure } from "@icat/lib/hooks";
import { Button } from "@icat/ui/components/button";
import { Card, CardContent } from "@icat/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@icat/ui/components/collapsible";
import { EmptyMessage } from "@icat/ui/components/empty-message";

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
            {amenities?.length ? (
              amenities.map((amenity, i) => (
                <Button
                  size="lg"
                  className="rounded-lg bg-accent flex-1 pointer-events-none font-semibold basis-20"
                  variant="outline"
                  key={i}
                >
                  {amenity}
                </Button>
              ))
            ) : (
              <EmptyMessage icon={Info} iconSize={32} message="No amenities added" className="py-2 w-full text-sm" />
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
