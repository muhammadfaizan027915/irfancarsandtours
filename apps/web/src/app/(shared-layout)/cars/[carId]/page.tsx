import { notFound } from "next/navigation";
import {
  CarDescription,
  CarProperties,
  CarAmenities,
  CarGetStarted,
  CarBooking,
} from "@icat/features";
import { getUserCar } from "@icat/web/data/cars";

type CarDetailPageProps = {
  params: Promise<{ carId: string }>;
};

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { carId } = await params;

  const car = await getUserCar(carId);

  const _cars = [
    {
      carId: car?.id!,
      bookedWithDriver: car?.forceWithDriver ?? false,
      quantity: 1,
    },
  ];

  if (!car) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-6 items-start gap-6">
      <div className="grid gap-6 col-span-4">
        <CarProperties {...car} />
        <CarDescription
          description={car?.description || "No description available"}
        />
        <CarAmenities amenities={car?.amenities || []} />
      </div>
      <div className="grid gap-6 col-span-2">
        <CarGetStarted />
        <CarBooking cars={_cars} />
      </div>
    </div>
  );
}
