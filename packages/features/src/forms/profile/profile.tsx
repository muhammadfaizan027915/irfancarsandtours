"use client";

import { AlertBox, Button, Card, Input, Textarea } from "@icat/ui";
import { ArrowRight, Mail, Phone, UserRound, MapPin } from "lucide-react";
import { signUpUser } from "@icat/web/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { CreateUserBodySchema } from "@icat/contracts";
import { useActionState } from "react";

export function ProfileForm() {
  const [lastResult, action] = useActionState(signUpUser, null);

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: CreateUserBodySchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Card className="w-full p-8 flex flex-col items-center gap-2 shadow-none">
      <h1 className="font-bold text-4xl">Update Your Profile</h1>

      <form
        action={action}
        onSubmit={form.onSubmit}
        className="flex flex-col gap-3 w-full mt-8"
      >
        {form?.errors?.map((error) => (
          <AlertBox variant="destructive" description={error} />
        ))}

        <Input
          type="text"
          placeholder="Name"
          startIcon={<UserRound size={18} />}
          key={fields.name.key}
          name={fields.name.name}
          defaultValue={fields.name.initialValue}
          errors={fields.name.errors}
        />

        <Input
          disabled
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.initialValue}
          errors={fields.email.errors}
        />

        <Input
          placeholder="Phone"
          startIcon={<Phone size={18} />}
          key={fields.phone.key}
          name={fields.phone.name}
          defaultValue={fields.phone.initialValue}
          errors={fields.phone.errors}
        />

        <Textarea
          className="h-30 scrollbar-thin"
          placeholder="Address"
          startIcon={<MapPin size={20} />}
          key={fields.address.key}
          name={fields.address.name}
          defaultValue={fields.address.initialValue}
          errors={fields.address.errors}
        />

        <Button size={"lg"} className="font-bold shadow-none group mt-4">
          Update Profile
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Card>
  );
}
