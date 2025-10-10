"use client";

import { BookedCarWithCarResponseDto } from "@icat/contracts";
import { userBookedCarsColumns } from "@icat/features/tables/userbookedcarstable/columns";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@icat/ui/components/button";
import { Input } from "@icat/ui/components/input";
import { toast } from "@icat/ui/components/sonner";
import { useDisclosure } from "@icat/lib/hooks";
import { qoutePrice } from "@icat/web/actions";
import { useState, KeyboardEvent } from "react";

export const bookedCarsColumns: ColumnDef<BookedCarWithCarResponseDto>[] = [
  ...userBookedCarsColumns,
  {
    id: "quotePrice",
    header: "Qoute Price",
    cell: ({ row }) => {
      const bookedCarId = row.original.id;
      const [isOpen, onOpen, onClose] = useDisclosure();
      const [qoutedPriceInput, setQoutedPriceInput] = useState<number>();
      const qoutedPrice = row.original.quotedPrice;

      const handleSavOnEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          handleSave();
        }
      };

      const handleSave = async () => {
        if (qoutedPriceInput) {
          const result = await qoutePrice(bookedCarId, qoutedPriceInput);

          if (result.error) {
            return toast.error("Failed to qoute price. Try again later.", {
              position: "top-center",
            });
          }

          onClose();

          return toast.success("Price qouted successfully.", {
            position: "top-center",
          });
        }
      };

      if (!qoutedPrice && !isOpen) {
        return (
          <Button className="shadow-none" onClick={onOpen}>
            Qoute Price
          </Button>
        );
      }

      if (qoutedPrice && !isOpen) {
        return (
          <Button className="shadow-none" onClick={onOpen}>
            Edit Price
          </Button>
        );
      }

      return (
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            className="w-30"
            onChange={(e) => setQoutedPriceInput(Number(e.target.value))}
            onKeyDown={handleSavOnEnter}
          />
          <Button className="shadow-none" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      );
    },
  },
];
