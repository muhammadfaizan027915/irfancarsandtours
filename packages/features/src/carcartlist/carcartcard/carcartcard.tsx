"use client";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@icat/ui";
import { CarCartCardProps } from "./carcartcard.types";
import { Armchair, Fuel, Trash2 } from "lucide-react";
import { NavigationUrls } from "../../header";
import { useCarCart } from "@icat/web/store";

import Image from "next/image";
import Link from "next/link";

export function CarCartCard({ car }: CarCartCardProps) {
  const { removeFromCart } = useCarCart();

  const handleRemoveFromCart = () => {
    removeFromCart(car?.id);
  };

  return (
    <Link href={`${NavigationUrls.CARS}/${car?.id}`}>
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
              <Armchair size={16} className="mr-1" /> {car.seatingCapacity}{" "}
              Seats
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <Button
            variant={"outline"}
            className="shadow-none"
            onClick={handleRemoveFromCart}
          >
            <Trash2 />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
