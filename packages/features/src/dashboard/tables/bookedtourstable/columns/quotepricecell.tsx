"use client";

import { Row } from "@tanstack/react-table";
import { KeyboardEvent, useState } from "react";

import { BookedTourListItemResponseDto } from "@icat/contracts";
import { useDisclosure } from "@icat/lib/hooks";
import { Button } from "@icat/ui/components/button";
import { Input } from "@icat/ui/components/input";
import { toast } from "@icat/ui/components/sonner";
import { quoteTourPrices } from "@icat/web/actions";

export const QuotePriceCell = ({ row }: { row: Row<BookedTourListItemResponseDto> }) => {
  const bookedTourId = row.original.id;
  const [isOpen, onOpen, onClose] = useDisclosure();
  
  const [quotedPricePerAdultInput, setQuotedPricePerAdultInput] = useState<number | undefined>(row.original.quotedPricePerAdult);
  const [quotedPricePerChildInput, setQuotedPricePerChildInput] = useState<number | undefined>(row.original.quotedPricePerChild);

  const handleSaveOnEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = async () => {
    if (quotedPricePerAdultInput !== undefined && quotedPricePerChildInput !== undefined) {
      const result = await quoteTourPrices(bookedTourId, quotedPricePerAdultInput, quotedPricePerChildInput);

      if (result.error) {
        return toast.error("Failed to quote prices. Try again later.", {
          position: "top-center",
        });
      }

      onClose();

      return toast.success("Prices quoted successfully.", {
        position: "top-center",
      });
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={onOpen}>
        Edit Prices
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-w-[200px]">
      <div className="flex gap-2 items-center justify-between">
        <label className="text-sm font-medium">Adult:</label>
        <Input
          type="number"
          className="w-24 h-8"
          value={quotedPricePerAdultInput}
          onChange={(e) => setQuotedPricePerAdultInput(Number(e.target.value))}
          onKeyDown={handleSaveOnEnter}
        />
      </div>
      <div className="flex gap-2 items-center justify-between">
        <label className="text-sm font-medium">Child:</label>
        <Input
          type="number"
          className="w-24 h-8"
          value={quotedPricePerChildInput}
          onChange={(e) => setQuotedPricePerChildInput(Number(e.target.value))}
          onKeyDown={handleSaveOnEnter}
        />
      </div>
      <div className="flex gap-2 mt-2 justify-end">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};
