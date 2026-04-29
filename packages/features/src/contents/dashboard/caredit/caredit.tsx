import { notFound } from "next/navigation";

import { CarForm } from "@icat/features/dashboard/forms/car";
import { SeoForm } from "@icat/features/dashboard/forms/seo";
import { getCarSeo } from "@icat/web/data/seo";
import { getCar } from "@icat/web/data/cars";

type DashboardCarEditContentProps = {
  carId: string;
};

export async function DashboardCarEditContent({
  carId,
}: DashboardCarEditContentProps) {
  const car = await getCar(carId);
  const seo = await getCarSeo(carId);

  if (!car) return notFound();

  return (
    <>
      <CarForm mode="update" car={car} />
      <SeoForm carId={car?.id} seo={seo} />
    </>
  );
}
