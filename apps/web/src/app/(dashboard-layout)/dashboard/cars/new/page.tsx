import { Badge } from "@icat/ui/components/badge";
import { CarForm } from "@icat/features/dashboard/forms/car";

export default function CreateCarPage() {
  return (
    <div className="flex flex-col gap-4">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Register New Car
      </Badge>
      <CarForm mode="create" />
    </div>
  );
}
