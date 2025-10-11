import Image from "next/image";
import { Header } from "@icat/features/header";
import { Topbar } from "@icat/features/topbar";
import { CircleCheck } from "lucide-react";

export function PrimrayHero() {
  return (
    <section className="relative h-[calc(100vh+80px)] w-full overflow-hidden">
      <Image
        src="/assets/hero_background_primary.jpg"
        alt="Luxury car background"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover object-center -z-10"
      />

      <div className="absolute inset-0 bg-black/65 -z-10"></div>

      <div className="relative h-full text-background dark:text-foreground">
        <Topbar varient="primary" />
        <Header varient="primary" />

        <div className="absolute top-1/2 left-0 -translate-y-1/2 px-[8%] md:px-[10%] flex flex-col gap-1 w-full md:w-fit">
          <p className="text-primary font-medium">Find Your Perfect Car</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-20 mb-4 md:mb-6 font-bold">
            Looking for a car? <br />
            You're at the right place.
          </h1>

          <div className="flex gap-4 md:gap-8 flex-col sm:flex-row">
            {["Comfort with quality", "Luxury Services", "24/7 Support"].map(
              (tagline) => (
                <span key={tagline} className="flex items-center gap-2">
                  <CircleCheck className="text-primary" /> {tagline}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
