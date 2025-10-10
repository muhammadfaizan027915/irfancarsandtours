import { NavigationUrls } from "@icat/features/header";
import { Button, SliderContainer } from "@icat/ui";
import { CarTypesLibrary } from "./cartypes.constants";
import { CarTypeCard } from "./cartypecard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CarTypes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-3xl font-bold">Find By Car Type</h3>
          <p className="text-muted-foreground">
            Find perfect car for any occasion
          </p>
        </div>

        <Button asChild variant="ghost" className="hover:bg-transparent group">
          <Link href={NavigationUrls.CARS}>
            Explore More
            <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      <SliderContainer>
        {CarTypesLibrary?.map((carType) => (
          <div key={carType?.name} className="p-2">
            <CarTypeCard name={carType?.name} image={carType?.image} />
          </div>
        ))}
      </SliderContainer>
    </div>
  );
}
