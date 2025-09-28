"use client";

import { AlertBox, Button, Card, Input, Textarea, toast } from "@icat/ui";
import { ArrowRight, Mail, Phone, UserRound, MapPin } from "lucide-react";
import { updateUser } from "@icat/web/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { UpdateUserBodySchema } from "@icat/contracts";
import { ProfileFormProps } from "./profile.types";
import { useActionState, useEffect } from "react";

export function ProfileForm({ user }: ProfileFormProps) {
  const [lastResult, action] = useActionState(updateUser, null);

  const [form, fields] = useForm({
    lastResult,
    defaultValue: user,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: UpdateUserBodySchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (lastResult?.status === "success") {
      toast.success("Profile updated successfully.", {
        position: "top-center",
      });
    }
  }, [lastResult]);

  return (
    <Card className="w-full p-8 flex flex-col items-center gap-2 shadow-none">
      <h1 className="font-bold text-4xl">Update Your Profile</h1>

      <form
        id={form.id}
        action={action}
        onSubmit={form.onSubmit}
        className="flex flex-col gap-3 w-full mt-8"
      >
        {form?.errors?.map((error) => (
          <AlertBox key={error} variant="destructive" description={error} />
        ))}

        <Input
          type="text"
          placeholder="Name"
          startIcon={<UserRound size={18} />}
          key={fields.name.key}
          name={fields.name.name}
          defaultValue={fields.name.defaultValue}
          errors={fields.name.errors}
        />

        <Input
          disabled
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.defaultValue}
          errors={fields.email.errors}
        />

        <Input
          placeholder="Phone"
          startIcon={<Phone size={18} />}
          key={fields.phone.key}
          name={fields.phone.name}
          defaultValue={fields.phone.defaultValue}
          errors={fields.phone.errors}
        />

        <Textarea
          className="h-30 scrollbar-thin"
          placeholder="Address"
          startIcon={<MapPin size={20} />}
          key={fields.address.key}
          name={fields.address.name}
          defaultValue={fields.address.defaultValue}
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
