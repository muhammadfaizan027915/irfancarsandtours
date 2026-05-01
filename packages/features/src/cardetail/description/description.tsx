"use client";

import { ChevronUp } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useDisclosure } from "@icat/lib/hooks";
import { Card, CardContent } from "@icat/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@icat/ui/components/collapsible";

import { CarDescriptionProps } from "./description.types";

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
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
