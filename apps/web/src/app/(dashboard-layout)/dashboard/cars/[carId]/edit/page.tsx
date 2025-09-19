import { Badge } from "@icat/ui";
import { CarForm } from "@icat/features";

export default function CreateCarPage() {
  return (
    <div className="flex flex-col gap-4">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Update Car
      </Badge>
      <CarForm mode="update" />
    </div>
  );
}
