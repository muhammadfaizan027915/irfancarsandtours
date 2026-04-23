import { CarForm } from "@icat/features/dashboard/forms/car";
import { notFound } from "next/navigation";
import { getCar } from "@icat/web/data/cars";

export async function DashboardCarEditContent({ carId }: { carId: string }) {
  const car = await getCar(carId);

  if (!car) return notFound();

  return <CarForm mode="update" car={car} />;
}
