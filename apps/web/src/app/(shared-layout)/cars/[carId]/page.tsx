import { notFound } from "next/navigation";
import { CarDescription } from "@icat/features/cardetail/description";
import { CarProperties } from "@icat/features/cardetail/properties";
import { CarAmenities } from "@icat/features/cardetail/amenities";
import { CarGetStarted } from "@icat/features/cardetail/getstarted";
import { CarBooking } from "@icat/features/cardetail/booking";
import { CarImages } from "@icat/features/sliders/carimages";
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
    <div className="grid gap-6">
      <CarImages imageUrls={car?.imageUrls || []} />
      <h1 className="font-bold text-5xl">
        {car?.name} {car?.model} {car?.year}
      </h1>
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
    </div>
  );
}
