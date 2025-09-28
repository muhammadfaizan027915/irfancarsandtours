"use client";

import {
  Button,
  Input,
  Label,
  Textarea,
  toast,
  Card,
  AlertBox,
} from "@icat/ui";
import { ArrowRight, Mail, Phone, UserRound } from "lucide-react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useForm } from "@conform-to/react";
import { useActionState, useEffect } from "react";
import { sendMessage } from "@icat/web/actions/contact";
import { ContactRequestBodySchema } from "@icat/contracts";

export function ContactForm() {
  const [lastResult, action] = useActionState(sendMessage, null);

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: ContactRequestBodySchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (lastResult?.status === "success") {
      toast.success("Message sent successfully!", { position: "top-center" });
      form.reset();
    }
  }, [lastResult]);

  return (
    <div>
      <h2 className="font-bold text-4xl md:text-5xl">Get in Touch</h2>

      <form
        id={form.id}
        action={action}
        onSubmit={form.onSubmit}
        className="mt-4 flex flex-col gap-4"
      >
        {form?.errors?.map((error) => (
          <AlertBox key={error} variant="destructive" description={error} />
        ))}

        <Label>Name</Label>
        <Input
          type="text"
          placeholder="Name"
          startIcon={<UserRound size={18} />}
          key={fields.name.key}
          name={fields.name.name}
          defaultValue={fields.name.defaultValue}
          errors={fields.name.errors}
        />

        <Label>Email Address</Label>
        <Input
          type="email"
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.defaultValue}
          errors={fields.email.errors}
        />

        <Label>Phone Number</Label>
        <Input
          type="tel"
          placeholder="Phone Number"
          startIcon={<Phone size={18} />}
          key={fields.phone.key}
          name={fields.phone.name}
          defaultValue={fields.phone.defaultValue}
          errors={fields.phone.errors}
        />

        <Label>Message</Label>
        <Textarea
          placeholder="Leave us a message..."
          key={fields.message.key}
          name={fields.message.name}
          defaultValue={fields.message.defaultValue}
          errors={fields.message.errors}
        />

        <Button size="lg" className="font-bold shadow-none group mt-4">
          Send Message
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </div>
  );
}
