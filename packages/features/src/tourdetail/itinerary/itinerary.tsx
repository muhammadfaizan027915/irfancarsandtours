"use client";

import { ChevronUp, Info } from "lucide-react";

import { useDisclosure } from "@icat/lib/hooks";
import { Card, CardContent } from "@icat/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@icat/ui/components/collapsible";
import { EmptyMessage } from "@icat/ui/components/empty-message";

import { TourItineraryProps } from "./itinerary.types";

export function TourItinerary({ itinerary }: TourItineraryProps) {
  const [open, onOpen, onClose] = useDisclosure(true);

  return (
    <Card className="shadow-none rounded-xl">
      <CardContent className="flex flex-row gap-4 w-full">
        <Collapsible
          open={open}
          onOpenChange={open ? onClose : onOpen}
          className="w-full"
        >
          <CollapsibleTrigger className="flex w-full items-center">
            <h1 className="text-start text-2xl font-bold flex-1">Itinerary</h1>
            <ChevronUp
              className={`${
                open ? "rotate-180" : "rotate-0"
              } transition-transform duration-500`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-6 w-full">
            {itinerary?.length ? (
              <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {itinerary.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-background">
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyMessage icon={Info} iconSize={32} message="No itinerary listed" className="py-4" />
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
