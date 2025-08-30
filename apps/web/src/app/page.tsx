import { BrandSlider, PrimrayHero, Searchbar } from "@icat/features";

export default function HomePage() {
  return (
    <>
      <PrimrayHero />
      <div className="bg-muted pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <Searchbar defaultTab="cars" />
          <BrandSlider />
        </div>
      </div>
    </>
  );
}
