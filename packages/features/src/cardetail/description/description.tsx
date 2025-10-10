"use client";

import { ChevronUp } from "lucide-react";
import { useDisclosure } from "@icat/lib/hooks";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@icat/ui/components/collapsible";
import { Card, CardContent } from "@icat/ui/components/card";
import { CarDescriptionProps } from "./description.types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function CarDescription({ description }: CarDescriptionProps) {
  const [open, onOpen, onClose] = useDisclosure(true);
  return (
    <Card className="shadow-none rounded-xl flex flex-row gap-4">
      <CardContent className="w-full">
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
              } transition-transform duration-500`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 w-[inherit]">
            <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
