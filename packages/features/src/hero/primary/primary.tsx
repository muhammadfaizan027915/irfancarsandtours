import { Header } from "../../header";
import { Topbar } from "../../topbar";
import { CircleCheck } from "lucide-react";

export function PrimrayHero() {
  return (
    <div className="relative h-[calc(100vh+80px)] w-full bg-[url('/assets/hero_background_primary.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative h-full text-background dark:text-foreground">
        <Topbar varient={"primary"} />
        <Header varient={"primary"} />

        <div className="absolute top-1/2 -translate-y-1/2 px-[8%] md:px-[10%] flex flex-col gap-1 w-full md:w-fit">
          <p className="text-primary font-medium">Find Your Perfect Car</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl md:leading-20 mb-4 md:mb-6 font-bold">
            Looking for a car ? <br />
            You're at right place.
          </h1>
          <div className="flex gap-4 md:gap-8 flex-col sm:flex-row">
            {["Comfort with quality", "Luxuary Services", "24/7 Support"]?.map(
              (_tagline) => (
                <span className="flex items-center gap-2" key={_tagline}>
                  <CircleCheck className="text-primary" /> {_tagline}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
