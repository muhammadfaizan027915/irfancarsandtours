import { ArrowRight } from "lucide-react";
import { Button } from "@icat/ui/components/button";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { BrandLibrary } from "./brands.constants";
import { BrandCard } from "./brandcard";
import Link from "next/link";

export function BrandSlider() {
  return (
    <div>
      <h3 className="text-4xl font-bold">Premium Brands</h3>
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <p className="text-muted-foreground">
          Discover a Handpicked Collection of Luxury Cars
        </p>

        <Button
          asChild
          variant={"ghost"}
          className="hover:bg-transparent group"
        >
          <Link href={NavigationUrls.CARS}>
            Show All Brands
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      <div className="mt-8 overflow-hidden group">
        <div className="flex gap-6 animate-slide group-hover:[animation-play-state:paused]">
          {Object.entries(BrandLibrary)?.map(([brand, { name, icon }], i) => (
            <BrandCard key={brand} brandIcon={icon} brandName={name} />
          ))}

          {Object.entries(BrandLibrary)?.map(([brand, { name, icon }], i) => (
            <BrandCard key={brand} brandIcon={icon} brandName={name} />
          ))}
        </div>
      </div>
    </div>
  );
}
