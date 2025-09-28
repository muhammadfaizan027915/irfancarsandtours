"use client";

import { AlertBox, Button, Card, Input, toast } from "@icat/ui";
import { ChangePasswordBodySchema } from "@icat/contracts";
import { ArrowRight, Lock } from "lucide-react";
import { parseWithZod } from "@conform-to/zod/v4";
import { changeUserPassword } from "@icat/web/actions";
import { useForm } from "@conform-to/react";
import { useActionState, useEffect } from "react";

export function ChangePasswordForm() {
  const [lastResult, action] = useActionState(changeUserPassword, null);

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: ChangePasswordBodySchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (lastResult?.status === "success") {
      toast.success("Password changed successfully.", {
        position: "top-center",
      });
    }
  }, [lastResult]);

  return (
    <Card className="w-full p-8 flex flex-col items-center gap-2 shadow-none">
      <h1 className="font-bold text-4xl">Change Password</h1>

      <form
        action={action}
        onSubmit={form.onSubmit}
        className="flex flex-col gap-3 w-full mt-8"
      >
        {form?.errors?.map((error) => (
          <AlertBox key={error} variant="destructive" description={error} />
        ))}

        <Input
          type="password"
          placeholder="Current Password"
          startIcon={<Lock size={18} />}
          key={fields.currentPassword.key}
          name={fields.currentPassword.name}
          defaultValue={fields.currentPassword.defaultValue}
          errors={fields.currentPassword.errors}
        />

        <Input
          type="password"
          placeholder="New Password"
          startIcon={<Lock size={18} />}
          key={fields.password.key}
          name={fields.password.name}
          defaultValue={fields.password.defaultValue}
          errors={fields.password.errors}
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          startIcon={<Lock size={18} />}
          key={fields.confirmPassword.key}
          name={fields.confirmPassword.name}
          defaultValue={fields.confirmPassword.defaultValue}
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
