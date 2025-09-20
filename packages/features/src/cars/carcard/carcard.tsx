import { Button } from "@icat/ui";
import { Fuel, Gauge, Armchair, Cog } from "lucide-react";
import { CarCardProps } from "./carcard.types";
import Image from "next/image";

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="border border-border rounded-xl hover:-translate-y-1 duration-300 transition-transform overflow-hidden">
      <div className="h-56 relative">
        <Image
          fill
          src={"/assets/hero_background_primary.jpg"}
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
            <Gauge size={22} className="inline mr-1" /> 25,000 Miles
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
        <Button
          className="w-full shadow-none font-bold border border-border bg-muted dark:not-[:hover]:text-muted-foreground hover:border-transparent hover:bg-primary"
          size="lg"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
