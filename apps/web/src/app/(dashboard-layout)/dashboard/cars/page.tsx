import { CarsTable, DashboardNavigationUrls } from "@icat/features";
import { Button } from "@icat/ui";
import { getCars } from "@icat/web/data/cars";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function CarsPage() {
  const result = await getCars();
  const cars = result.data;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight">Cars</h1>
          <p className="text-muted-foreground">
            Register and Manage your Cars in the System.
          </p>
        </div>

        <Button className="w-fit" size={"lg"} asChild>
          <Link href={DashboardNavigationUrls.REGISTER_CAR}>
            <Plus /> Register New
          </Link>
        </Button>
      </div>

      <CarsTable cars={cars} />
    </div>
  );
}
