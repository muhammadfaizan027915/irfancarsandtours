"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
} from "@icat/ui";
import { CarCartCardProps } from "./carcartcard.types";
import { Armchair, Fuel, Minus, Plus } from "lucide-react";
import { useCarCart } from "@icat/web/store";
import { MouseEvent } from "react";

import Image from "next/image";

export function CarCartCard({ car }: CarCartCardProps) {
  const { incrementQuantity, decrementQuantity, toggleDriver } = useCarCart();

  const handleIncrementQuantity = (e: MouseEvent) => {
    incrementQuantity(car.id);
  };

  const handleDecrementQuantity = (e: MouseEvent) => {
    decrementQuantity(car.id);
  };

  const handleToggleDriver = (checked: boolean) => {
    toggleDriver(
      car.id,
      car.forceWithDriver ? checked : car?.forceWithDriver ?? true
    );
  };

  return (
    <Card className="flex flex-row gap-2 items-center p-3 rounded-xl shadow-none hover:shadow hover:-translate-y-1 duration-300 transition-normal">
      <div className="relative w-24 h-20 rounded-lg overflow-hidden">
        <Image
          src={car.imageUrls?.[0] || "/assets/hero_background_primary.jpg"}
          alt={`${car.name} ${car.brand}`}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <CardContent className="flex-1 p-0">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-bold">
            {car.name} {car.brand}
          </CardTitle>
        </CardHeader>

        <div className="text-sm text-muted-foreground flex gap-4">
          <span className="flex items-center">
            <Fuel size={16} className="mr-1" /> {car.fuelType}
          </span>
          <span className="flex items-center">
            <Armchair size={16} className="mr-1" /> {car.seatingCapacity} Seats
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="shadow-none h-6 w-6"
            onClick={handleDecrementQuantity}
          >
            <Minus size={14} />
          </Button>
          <span className="text-sm font-semibold">{car.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="shadow-none h-6 w-6"
            onClick={handleIncrementQuantity}
          >
            <Plus size={14} />
          </Button>

          <Checkbox
            id={`driver-${car.id}`}
            disabled={car.forceWithDriver ?? false}
            defaultChecked={car.forceWithDriver ?? false}
            onCheckedChange={handleToggleDriver}
            className="ml-4 cursor-pointer"
          />
          <label
            htmlFor={`driver-${car.id}`}
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Book with Driver
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
