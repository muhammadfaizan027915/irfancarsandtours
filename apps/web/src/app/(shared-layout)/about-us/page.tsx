import { SecondaryHero } from "@icat/features/common/hero/secondary";
import { OurServices } from "@icat/features/common/ourservices";
import { HowItWork } from "@icat/features/common/howitwork";
import { WhyChoose } from "@icat/features/common/whychoose";

export default function AboutUsPage() {
  return (
    <>
      <SecondaryHero
        position="start"
        title="About Us"
        subtitle="Get to know us, What we do ?"
      />

      <div className="container mx-auto">
        <OurServices />
        <HowItWork />
        <WhyChoose />
      </div>
    </>
  );
}
