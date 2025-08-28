import { PrimrayHero, Searchbar } from "@icat/features";

export default function HomePage() {
  return (
    <>
      <PrimrayHero />
      <Searchbar defaultTab="cars" />
    </>
  );
}
