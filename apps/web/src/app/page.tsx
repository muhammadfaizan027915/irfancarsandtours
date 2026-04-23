import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Searchbar } from "@icat/features/searchbar";
import { BrandSlider } from "@icat/features/sliders/brands";
import { CarTypes } from "@icat/features/sliders/cartypes";
import { FloatingWhatsApp } from "@icat/features/floatingwhatsapp";
import { PrimrayHero } from "@icat/features/hero/primary";
import { HowItWork } from "@icat/features/howitwork";
import {
  HomeFeaturedCars,
  HomeFeaturedCarsSkeleton,
  HomeSearchedCars,
  HomeSearchedCarsSkeleton
} from "@icat/features/contents/home";


const Footer = dynamic(() =>
  import("@icat/features/footer").then((m) => m.Footer)
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
          <Suspense fallback={<HomeFeaturedCarsSkeleton />}>
            <HomeFeaturedCars />
          </Suspense>
        </div>

        <div className="pb-16 container mx-auto px-4 md:px-8">
          <Suspense fallback={<HomeSearchedCarsSkeleton />}>
            <HomeSearchedCars />
          </Suspense>
        </div>

        <div className="bg-muted pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <HowItWork />
          </div>
        </div>
      </main>

      <Footer />

      <FloatingWhatsApp />
    </>
  );
}
