"use client";

import { NavigationUrls } from "../../header";
import { AlertBox, Badge, Button, Card, Input } from "@icat/ui";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { logInUser } from "@icat/web/actions";
import { useActionState } from "react";
import Link from "next/link";

export function SignInFrom() {
  const [result, action] = useActionState(logInUser, null);

  const success = result?.success;
  const error = result?.error;

  return (
    <Card className="w-full p-8 max-w-md flex flex-col items-center gap-2 shadow-none">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Sign In
      </Badge>

      <h1 className="font-bold text-4xl">Welcome Back</h1>

      <form action={action} className="flex flex-col gap-3 w-full mt-8">
        {!success && error?.message && (
          <AlertBox
            key={error.status}
            variant="destructive"
            description={error?.message}
          />
        )}

        <Input
          name={"email"}
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
          errors={error?.cause?.email?._errors}
        />

        <Input
          type="password"
          name={"password"}
          placeholder="Password"
          startIcon={<Lock size={18} />}
          errors={error?.cause?.password?._errors}
        />

        <Button size={"lg"} className="font-bold shadow-none group mt-4">
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
