"use client";

import {
  AlertBox,
  Badge,
  Button,
  Card,
  Input,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Textarea,
} from "@icat/ui";
import { ArrowRight, Mail, Lock, UserRound } from "lucide-react";
import { signUpUser } from "@icat/web/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { CreateUserBodySchema } from "@icat/contracts";
import { useActionState } from "react";

export function ChangePasswordForm() {
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
      <h1 className="font-bold text-4xl">Change Password</h1>

      <form
        action={action}
        onSubmit={form.onSubmit}
        className="flex flex-col gap-3 w-full mt-8"
      >
        {form?.errors?.map((error) => (
          <AlertBox variant="destructive" description={error} />
        ))}

        <Input
          type="password"
          placeholder="Current Password"
          startIcon={<Lock size={18} />}
          key={fields.password.key}
          name={fields.password.name}
          defaultValue={fields.password.initialValue}
          errors={fields.password.errors}
        />

        <Input
          type="password"
          placeholder="New Password"
          startIcon={<Lock size={18} />}
          key={fields.password.key}
          name={fields.password.name}
          defaultValue={fields.password.initialValue}
          errors={fields.password.errors}
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          startIcon={<Lock size={18} />}
          key={fields.confirmPassword.key}
          name={fields.confirmPassword.name}
          defaultValue={fields.confirmPassword.initialValue}
          errors={fields.confirmPassword.errors}
        />

        <Button size={"lg"} className="font-bold shadow-none group mt-4">
          Change Password
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Card>
  );
}
