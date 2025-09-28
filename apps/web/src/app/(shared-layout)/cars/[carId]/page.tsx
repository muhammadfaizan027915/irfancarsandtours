import { notFound } from "next/navigation";
import { CarService } from "@icat/services";
import {
  CarDescription,
  CarProperties,
  CarAmenities,
  CarGetStarted,
  CarBooking,
} from "@icat/features";

type CarDetailPageProps = {
  params: Promise<{ carId: string }>;
};

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { carId } = await params;

  const carService = new CarService();
  const car = await carService.getCarById(carId);

  if (!car) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-[1fr_400px] items-start gap-6">
      <div className="grid gap-6">
        <CarProperties {...car} />
        <CarDescription
          description={car?.description || "No description available"}
        />
        <CarAmenities amenities={car?.amenities || []} />
      </div>
      <div className="grid gap-6">
        <CarGetStarted />
        <CarBooking />
      </div>
    </div>
  );
}
