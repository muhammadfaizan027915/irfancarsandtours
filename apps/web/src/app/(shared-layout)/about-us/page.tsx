import { SecondaryHero } from "@icat/features/common/hero/secondary";
import { HowItWork } from "@icat/features/common/howitwork";

export default function AboutUsPage() {
  return (
    <>
      <SecondaryHero
        position="start"
        title="About Us"
        subtitle="Get to know us, What we do ?"
      />

      <div className="container mx-auto">
        <HowItWork />
      </div>
    </>
  );
}
