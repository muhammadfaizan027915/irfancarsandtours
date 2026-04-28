import { notFound } from "next/navigation";

import { CarForm } from "@icat/features/dashboard/forms/car";
import { getCar } from "@icat/web/data/cars";
import { getCarSeo } from "@icat/web/data/seo";

export async function DashboardCarEditContent({ carId }: { carId: string }) {
  const car = await getCar(carId);
  const seo = await getCarSeo(carId);

  if (!car) return notFound();

  return <CarForm mode="update" car={car} seo={seo} />;
}
