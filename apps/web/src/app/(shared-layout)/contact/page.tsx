import { Map } from "@icat/features/map";
import { ContactForm } from "@icat/features/forms/contact";
import { SecondaryHero } from "@icat/features/hero/secondary";

export default function ContactPage() {
  return (
    <>
      <SecondaryHero
        position="start"
        title="Get in touch"
        subtitle="Reach out us at anytime"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-8">
        <ContactForm />
        <Map />
      </div>
    </>
  );
}
