"use client";

import { NavigationUrls } from "../../header";
import { AlertBox, Badge, Button, Card, Input } from "@icat/ui";
import { ArrowRight, Mail, Lock, UserRound } from "lucide-react";
import { signUpUser } from "@icat/web/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { CreateUserBodySchema } from "@icat/contracts";
import { useActionState } from "react";
import Link from "next/link";

export function SignUpForm() {
  const [lastResult, action] = useActionState(signUpUser, null);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: CreateUserBodySchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Card className="w-full p-8 max-w-md flex flex-col items-center gap-2 shadow-none">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Sign Up
      </Badge>

      <h1 className="font-bold text-4xl">Create an Account</h1>

      <form
        id={form.id}
        action={action}
        onSubmit={form.onSubmit}
        className="flex flex-col gap-3 w-full mt-8"
        method="POST"
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
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.initialValue}
          errors={fields.email.errors}
        />

        <Input
          type="password"
          placeholder="Password"
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
          Sign Up
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      <p className="text-muted-foreground text-sm mt-10">
        Already have an account?{" "}
        <Link
          href={NavigationUrls.SIGNIN}
          className="text-foreground hover:text-primary"
        >
          Sign In Here !
        </Link>
      </p>
    </Card>
  );
}
