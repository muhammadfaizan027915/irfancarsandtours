import { SecondaryHero } from "@icat/features/hero/secondary";

import dynamic from "next/dynamic";

const ContactForm = dynamic(() =>
  import("@icat/features/forms/contact").then((m) => m.ContactForm)
);

const Map = dynamic(() => import("@icat/features/map").then((m) => m.Map));

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
