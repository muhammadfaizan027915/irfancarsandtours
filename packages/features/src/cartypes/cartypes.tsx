import { Button } from "@icat/ui";
import { NavigationUrls } from "../header";
import { CarTypeCard } from "./cartypecard";
import { ArrowRight } from "lucide-react";
import { CarTypesList } from "@icat/database";
import Link from "next/link";

export function CarTypes() {
  return (
    <div>
      <h3 className="text-3xl font-bold">Find By Car Type</h3>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Find perfect car for any occasion
        </p>

        <Button
          asChild
          variant={"ghost"}
          className="hover:bg-transparent group"
        >
          <Link href={NavigationUrls.CARS}>
            Explore More
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {CarTypesList?.map((carType) => (
          <CarTypeCard name={carType} key={carType} />
        ))}
      </div>
    </div>
  );
}
