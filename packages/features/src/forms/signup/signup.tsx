"use client";

import { NavigationUrls } from "../../header";
import { AlertBox, Badge, Button, Card, Input } from "@icat/ui";
import { ArrowRight, Mail, Lock, UserRound } from "lucide-react";
import { signUpUser } from "@icat/web/actions";
import { useActionState } from "react";
import Link from "next/link";

export function SignUpForm() {
  const [result, action] = useActionState(signUpUser, null);

  const success = result?.success;
  const error = result?.error;

  return (
    <Card className="w-full p-8 max-w-md flex flex-col items-center gap-2 shadow-none">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Sign Up
      </Badge>

      <h1 className="font-bold text-4xl">Create an Account</h1>

      <form action={action} className="flex flex-col gap-3 w-full mt-8">
        {!success && error?.message && (
          <AlertBox
            key={error.status}
            variant="destructive"
            description={error?.message}
          />
        )}

        <Input
          type="text"
          placeholder="Name"
          startIcon={<UserRound size={18} />}
          name={"name"}
          errors={error?.cause?.name?._errors}
        />

        <Input
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
          name={"email"}
          errors={error?.cause?.email?._errors}
        />

        <Input
          type="password"
          placeholder="Password"
          startIcon={<Lock size={18} />}
          name={"password"}
          errors={error?.cause?.password?._errors}
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          startIcon={<Lock size={18} />}
          name={"confirmPassword"}
          errors={error?.cause?.confirmPassword?._errors}
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
