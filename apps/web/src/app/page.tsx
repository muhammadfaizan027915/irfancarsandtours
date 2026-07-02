import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Searchbar } from "@icat/features/common/searchbar";
import { BrandSlider } from "@icat/features/sliders/brands";
import { CarTypes } from "@icat/features/sliders/cartypes";
import { FloatingWhatsApp } from "@icat/features/common/floatingwhatsapp";
import { PrimrayHero } from "@icat/features/common/hero/primary";
import { HowItWork } from "@icat/features/common/howitwork";
import { OurServices } from "@icat/features/common/ourservices";
import {
  HomeFeaturedCars,
  HomeFeaturedCarsSkeleton,
  HomeFeaturedTours,
  HomeFeaturedToursSkeleton,
  HomeSearchedCars,
  HomeSearchedCarsSkeleton,
} from "@icat/features/contents/home";
import { WhyChoose } from "@icat/features/common/whychoose";

import { Skeleton } from "@icat/ui/components/skeleton";

const Footer = dynamic(
  () => import("@icat/features/common/footer").then((m) => m.Footer),
  {
    loading: () => <Skeleton className="h-40 w-full" />,
  },
);

export default function HomePage() {
  return (
    <>
      <section>
        <PrimrayHero />
      </section>

      <main className="pb-16">
        <div className="bg-muted pb-16">
          <div className="container mx-auto px-2 md:px-8">
            <Searchbar type="cars" showTabs={true} />
            <BrandSlider />
          </div>
        </div>

        <div className="py-16 container mx-auto px-2 md:px-8">
          <CarTypes />
        </div>

        <div className="pb-16 container mx-auto px-2 md:px-8">
          <Suspense fallback={<HomeFeaturedCarsSkeleton />}>
            <HomeFeaturedCars />
          </Suspense>
        </div>

        <div className="pb-16 container mx-auto px-2 md:px-8">
          <Suspense fallback={<HomeFeaturedToursSkeleton />}>
            <HomeFeaturedTours />
          </Suspense>
        </div>

        <div className="pb-16 container mx-auto px-2 md:px-8">
          <Suspense fallback={<HomeSearchedCarsSkeleton />}>
            <HomeSearchedCars />
          </Suspense>
        </div>

        <div className="pb-16 container mx-auto px-4 md:px-8">
          <OurServices />
        </div>

        <div className="bg-muted pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <HowItWork />
          </div>
        </div>

        <div className="pb-16 container mx-auto px-4 md:px-8">
          <WhyChoose />
        </div>
      </main>

      <Footer />

      <FloatingWhatsApp />
    </>
  );
}
