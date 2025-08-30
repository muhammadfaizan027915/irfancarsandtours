import { Button, Input, Label, Textarea } from "@icat/ui";
import { ArrowRight, Mail, Phone, UserRound } from "lucide-react";

export function ContactForm() {
  return (
    <div>
      <h2 className="font-bold text-4xl md:text-5xl">Get in Touch</h2>

      <form className="mt-4 flex flex-col gap-4">
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="Name"
          startIcon={<UserRound size={18} />}
          className="bg-transparent"
        />

        <Label>Email Address</Label>

        <Input
          type="email"
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
          className="bg-transparent"
        />

        <Label>Phone Number</Label>

        <Input
          type="tel"
          placeholder="Phone Number"
          startIcon={<Phone size={18} />}
          className="bg-transparent"
        />

        <Label>Phone Number</Label>
        <Textarea placeholder="Leave us a message..." />

        <Button size={"lg"} className="font-bold shadow-none group mt-4">
          Send Message
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </div>
  );
}
