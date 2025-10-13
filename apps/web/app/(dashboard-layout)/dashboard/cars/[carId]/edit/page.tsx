import { Badge } from "@icat/ui/components/badge";
import { CarForm } from "@icat/features/dashboard/forms/car";
import { notFound } from "next/navigation";
import { getCar } from "@icat/web/data/cars";

type UpdateCarProps = {
  params: Promise<{ carId: string }>;
};

export default async function UpdateCarPage({ params }: UpdateCarProps) {
  const { carId } = await params;
  const car = await getCar(carId);

  if (!car) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Update Car
      </Badge>
      <CarForm mode="update" car={car} />
    </div>
  );
}
