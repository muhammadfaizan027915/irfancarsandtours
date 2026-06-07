"use client";

import { ChevronUp } from "lucide-react";

import { useDisclosure } from "@icat/lib/hooks";
import { Button } from "@icat/ui/components/button";
import { Card, CardContent } from "@icat/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@icat/ui/components/collapsible";

import { TourInclusionsProps } from "./inclusions.types";

export function TourInclusions({
  inclusions,
  exclusions,
}: TourInclusionsProps) {
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
            <h1 className="text-start text-2xl font-bold flex-1">
              What&apos;s Included & Excluded
            </h1>
            <ChevronUp
              className={`${
                open ? "rotate-180" : "rotate-0"
              } transition-transform duration-500`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-6 mt-6">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase text-primary tracking-widest">
                Inclusions
              </h4>
              <div className="flex flex-wrap gap-2">
                {inclusions?.map((item, i) => (
                  <Button
                    size="lg"
                    className="rounded-lg bg-accent pointer-events-none font-semibold basis-20"
                    variant="outline"
                    key={i}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase text-destructive tracking-widest">
                Exclusions
              </h4>
              <div className="flex flex-wrap gap-2">
                {exclusions?.map((item, i) => (
                  <Button
                    size="lg"
                    className="rounded-lg bg-destructive-foreground border-destructive/40  pointer-events-none font-semibold basis-20"
                    variant="outline"
                    key={i}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
