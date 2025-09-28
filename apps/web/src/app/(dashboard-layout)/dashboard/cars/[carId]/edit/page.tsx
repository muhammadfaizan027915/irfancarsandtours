import { Badge } from "@icat/ui";
import { CarForm } from "@icat/features";
import { CarService } from "@icat/services";
import { notFound } from "next/navigation";
import { auth } from "@icat/lib";

type UpdateCarProps = {
  params: Promise<{ carId: string }>;
};

export default async function UpdateCarPage({ params }: UpdateCarProps) {
  const { carId } = await params;
  const session = await auth();

  if (!session?.user?.email) return <p>Not authenticated</p>;

  const carService = new CarService();
  const car = await carService.getCarById(carId);

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
