"use client";

import { ChevronUp } from "lucide-react";
import { useDisclosure } from "@icat/lib/hooks";
import {
  Card,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@icat/ui";
import { CarDescriptionProps } from "./cardescription.types";
import Markdown from "react-markdown";

export function CarDescription({ description }: CarDescriptionProps) {
  const [open, onOpen, onClose] = useDisclosure();
  return (
    <Card className="p-8 shadow-none rounded-xl flex flex-row gap-4">
      <Collapsible
        open={open}
        onOpenChange={open ? onClose : onOpen}
        className="w-full"
      >
        <CollapsibleTrigger className="flex w-full items-center">
          <h1 className="text-start text-2xl font-bold flex-1">Overview</h1>
          <ChevronUp
            className={`${
              open ? "rotate-180" : "rotate-0"
            } transition-transform duration-300`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <Markdown>{description}</Markdown>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
