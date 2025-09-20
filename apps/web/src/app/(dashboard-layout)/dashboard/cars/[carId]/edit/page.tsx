import { Badge } from "@icat/ui";
import { CarForm } from "@icat/features";
import { CarService } from "@icat/services";
import { auth } from "@icat/lib";

type UpdateCarProps = {
  searchParams: { carId: string };
};

export default async function UpdateCarPage({
  searchParams: { carId },
}: UpdateCarProps) {
  const session = await auth();

  if (!session?.user?.email) return <p>Not authenticated</p>;

  const carService = new CarService();
  const car = await carService.getCarById(carId);

  if(!car) return null;

  return (
    <div className="flex flex-col gap-4">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Update Car
      </Badge>
      <CarForm mode="update" defaultValue={car} />
    </div>
  );
}
