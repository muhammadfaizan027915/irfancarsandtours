import { notFound } from "next/navigation";

import { CarAmenities } from "@icat/features/cardetail/amenities";
import { CarBooking } from "@icat/features/cardetail/booking";
import { CarDescription } from "@icat/features/cardetail/description";
import { CarGetStarted } from "@icat/features/cardetail/getstarted";
import { CarProperties } from "@icat/features/cardetail/properties";
import { CarImages } from "@icat/features/sliders/carimages";
import { getUserCar } from "@icat/web/data/cars";

export async function CarDetailContent({ carId }: { carId: string }) {
  const car = await getUserCar(carId);

  if (!car) {
    return notFound();
  }

  const _cars = [
    {
      carId: car.id,
      bookedWithDriver: car?.forceWithDriver ?? false,
      quantity: 1,
    },
  ];

  return (
    <div className="grid gap-6">
      <CarImages imageUrls={car?.imageUrls || []} />
      <div className="container mx-auto grid gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-5xl">
            {car?.brand} {car?.name} {car?.year}
          </h1>
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-muted-foreground uppercase font-bold tracking-widest">
              Starting from
            </span>
            <span className="text-3xl font-black text-primary leading-none">
              Rs. {car?.startingPrice?.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-6 items-start gap-6">
          <div className="grid gap-6 col-span-6 lg:col-span-4">
            <CarProperties {...car} />
            <CarDescription
              description={car?.description || "No description available"}
            />
            <CarAmenities amenities={car?.amenities || []} />
          </div>
          <div className="grid gap-6 col-span-6 lg:col-span-2">
            <CarGetStarted />
            <CarBooking cars={_cars} />
          </div>
        </div>
      </div>
    </div>
  );
}
