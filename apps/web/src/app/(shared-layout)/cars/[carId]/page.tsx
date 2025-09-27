import { notFound } from "next/navigation";
import { CarService } from "@icat/services";
import { CarDescription, CarProperties } from "@icat/features";

type CarDetailPageProps = {
  params: {
    carId: string;
  };
};

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { carId } = await params;

  const carService = new CarService();
  const car = await carService.getCarById(carId);

  if (!car) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-[1fr_400px] gap-6">
      <CarProperties {...car} />
      <div></div>
      <CarDescription description={car.description || "No description available"} />
    </div>
  );
}
