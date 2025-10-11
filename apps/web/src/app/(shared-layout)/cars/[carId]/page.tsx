import { notFound } from "next/navigation";
import { CarImages } from "@icat/features/sliders/carimages";
import { getUserCar } from "@icat/web/data/cars";

import dynamic from "next/dynamic";

const CarBooking = dynamic(() =>
  import("@icat/features/cardetail/booking").then((m) => m.CarBooking)
);

const CarDescription = dynamic(() =>
  import("@icat/features/cardetail/description").then((m) => m.CarDescription)
);

const CarProperties = dynamic(() =>
  import("@icat/features/cardetail/properties").then((m) => m.CarProperties)
);

const CarAmenities = dynamic(() =>
  import("@icat/features/cardetail/amenities").then((m) => m.CarAmenities)
);

const CarGetStarted = dynamic(() =>
  import("@icat/features/cardetail/getstarted").then((m) => m.CarGetStarted)
);

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
