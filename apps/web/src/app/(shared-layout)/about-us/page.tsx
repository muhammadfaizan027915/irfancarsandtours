import { SecondaryHero } from "@icat/features/hero/secondary";
import { HowItWork } from "@icat/features/howitwork";

export default function AboutUsPage() {
  return (
    <>
      <SecondaryHero
        position="start"
        title="About Us"
        subtitle="Get to know us, What we do ?"
      />

      <HowItWork />
    </>
  );
}
