"use client";

import { Button, toast } from "@icat/ui";
import { useCarCart } from "@icat/web/store";
import { Fuel, Armchair, Cog, ShoppingCart, CarFront } from "lucide-react";
import { NavigationUrls } from "../../header";
import { CarCardProps } from "./carcard.types";
import Image from "next/image";
import Link from "next/link";

export function CarCard({ car }: CarCardProps) {
  const { addToCart } = useCarCart();
  const imageUrl = car?.imageUrls?.[0];

  const handleAddToCart = () => {
    if (car) {
      addToCart({ ...car, quantity: 1 });

      toast.success("Car successfully added to cart.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="border border-border rounded-xl hover:shadow-2xl hover:-translate-y-1 duration-300 transition-normal overflow-hidden">
      <div className="h-56 relative">
        <Image
          fill
          src={imageUrl || null}
          alt=""
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      <div className="p-6 pt-8 bg-card rounded-2xl flex flex-col gap-6">
        <h4 className="text-2xl font-bold">{`${car?.name} ${car?.brand}`}</h4>
        <hr className="border-t border-border" />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <span className="flex items-center">
            <CarFront size={22} className="inline mr-1" /> {car?.carType}
          </span>

          <span className="flex items-center">
            <Cog size={22} className="inline mr-1" /> {car?.transmissionType}
          </span>

          <span className="flex items-center">
            <Fuel size={22} className="inline mr-1" /> {car?.fuelType}
          </span>

          <span className="flex items-center">
            <Armchair size={22} className="inline mr-1" />{" "}
            {car?.seatingCapacity} Seats
          </span>
        </div>

        <div className="flex gap-2">
          <Button className="shadow-none" onClick={handleAddToCart}>
            <ShoppingCart />
          </Button>

          <Button
            asChild
            className="flex-1 shadow-none font-bold border border-border bg-muted dark:not-[:hover]:text-muted-foreground hover:border-transparent hover:bg-primary"
            size="lg"
          >
            <Link href={`${NavigationUrls.CARS}/${car?.id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
