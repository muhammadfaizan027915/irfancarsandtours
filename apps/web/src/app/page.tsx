import dynamic from "next/dynamic";

import { Searchbar } from "@icat/features/searchbar";
import { PrimrayHero } from "@icat/features/hero/primary";
import { HowItWork } from "@icat/features/howitwork";
import { Footer } from "@icat/features/footer";

const BrandSlider = dynamic(() =>
  import("@icat/features/sliders/brands").then((m) => m.BrandSlider)
);

const CarTypes = dynamic(() =>
  import("@icat/features/sliders/cartypes").then((m) => m.CarTypes)
);

const FeaturedCars = dynamic(() =>
  import("@icat/features/sliders/featuredcars").then((m) => m.FeaturedCars)
);

const SearchedCars = dynamic(() =>
  import("@icat/features/sliders/searchedcars").then((m) => m.SearchedCars)
);

export default function HomePage() {
  return (
    <>
      <section>
        <PrimrayHero />
      </section>

      <main className="pb-16">
        <div className="bg-muted pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <Searchbar type="cars" />
            <BrandSlider />
          </div>
        </div>

        <div className="py-16 container mx-auto px-4 md:px-8">
          <CarTypes />
        </div>

        <div className="pb-16 container mx-auto px-4 md:px-8">
          <FeaturedCars />
        </div>

        <div className="pb-16 container mx-auto px-4 md:px-8">
          <SearchedCars />
        </div>

        <div className="bg-muted pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <HowItWork />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
