import { Button } from "@icat/ui";
import { ArrowRight } from "lucide-react";
import { BrandCard } from "./brandcard";
import { BrandLibrary } from "./brands.constants";
import { NavigationUrls } from "../../header";
import Link from "next/link";

export function BrandSlider() {
  return (
    <div>
      <h3 className="text-4xl font-bold">Premium Brands</h3>
      <div className="flex items-center justify-between">
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
          {Object.entries(BrandLibrary)?.map(([brand, { icon }], i) => (
            <BrandCard key={brand} brandIcon={icon} />
          ))}

          {Object.entries(BrandLibrary)?.map(([brand, { icon }], i) => (
            <BrandCard key={brand} brandIcon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
