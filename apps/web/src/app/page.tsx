import {
  BrandSlider,
  PrimrayHero,
  Searchbar,
  CarTypes,
  CarCard,
} from "@icat/features";

export default function HomePage() {
  return (
    <>
      <PrimrayHero />
      <section className="bg-muted pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <Searchbar defaultTab="cars" />
          <BrandSlider />
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <CarTypes />
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <CarCard />
        </div>
      </section>
    </>
  );
}
