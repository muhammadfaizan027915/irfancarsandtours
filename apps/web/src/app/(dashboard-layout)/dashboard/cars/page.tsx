import { CarsTable, RegisterCarForm } from "@icat/features";
import { Button } from "@icat/ui";
import { Plus } from "lucide-react";

export default function CarsPage() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight">Cars</h1>
          <p className="text-muted-foreground">
            Register and Manage your Cars in the System.
          </p>
        </div>

        <Button className="w-fit" size={"lg"}>
          <Plus /> Register New
        </Button>
      </div>

      <CarsTable />
    </div>
  );
}
