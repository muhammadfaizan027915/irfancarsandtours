import { ContactForm, SecondaryHero } from "@icat/features";

export default function ContactPage() {
  return (
    <>
      <SecondaryHero
        position="start"
        title="Get in touch"
        subtitle="Reach out us at anytime"
      />

      <ContactForm />
    </>
  );
}
