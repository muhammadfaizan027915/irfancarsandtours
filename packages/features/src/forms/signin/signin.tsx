"use client";

import { NavigationUrls } from "../../header";
import { AlertBox, Badge, Button, Card, Input } from "@icat/ui";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { logInUser } from "@icat/web/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { SignInBodySchema } from "@icat/contracts";
import { useActionState } from "react";
import Link from "next/link";

export function SignInFrom() {
  const [lastResult, action] = useActionState(logInUser, null);

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: SignInBodySchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Card className="w-full p-8 max-w-md flex flex-col items-center gap-2 shadow-none">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Sign In
      </Badge>

      <h1 className="font-bold text-4xl">Welcome Back</h1>

      <form
        id={form.id}
        action={action}
        onSubmit={form.onSubmit}
        className="flex flex-col gap-3 w-full mt-8"
      >
        {form?.errors?.map((error) => (
          <AlertBox variant="destructive" description={error} />
        ))}

        <Input
          key={fields.email.key}
          name={fields.email.name}
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
          defaultValue={fields?.email?.initialValue}
          errors={fields.email.errors}
        />

        <Input
          type="password"
          key={fields.password.key}
          name={fields.password.name}
          placeholder="Password"
          startIcon={<Lock size={18} />}
          defaultValue={fields?.email?.initialValue}
          errors={fields.password.errors}
        />

        <Button
          size={"lg"}
          className="font-bold shadow-none group mt-4"
        >
          Sign In
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      <p className="text-muted-foreground text-sm mt-10">
        Don’t have an account?{" "}
        <Link
          href={NavigationUrls.SIGNUP}
          className="text-foreground hover:text-primary"
        >
          Sign Up Here !
        </Link>
      </p>
    </Card>
  );
}
