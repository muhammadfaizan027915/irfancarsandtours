import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { NavigationUrls } from "@icat/features/header/header.constants";
import { Button } from "@icat/ui/components/button";
import { SliderContainer } from "@icat/ui/components/slider-container";

import { CarTypeCard } from "./cartypecard";
import { CarTypesLibrary } from "./cartypes.constants";

export function CarTypes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
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
          <CarTypeCard key={carType?.name} name={carType?.name} image={carType?.image} />
        ))}
      </SliderContainer>
    </div>
  );
}
