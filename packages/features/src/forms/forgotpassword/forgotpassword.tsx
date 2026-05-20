"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useActionState } from "react";

import { AlertBox } from "@icat/ui/components/alert";
import { Badge } from "@icat/ui/components/badge";
import { Button } from "@icat/ui/components/button";
import { Card } from "@icat/ui/components/card";
import { Input } from "@icat/ui/components/input";
import { forgotPassword } from "@icat/web/actions";

export function ForgotPasswordForm() {
  const [result, action, pending] = useActionState(forgotPassword, null);

  const success = result?.success;
  const error = result?.error;

  return (
    <Card className="w-full p-6 md:p-8 max-w-md flex flex-col items-center gap-2 shadow-none">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Forgot Password
      </Badge>

      <h1 className="font-bold text-4xl text-center">Recover Your Account</h1>
      <p className="text-muted-foreground text-sm text-center mt-2">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form action={action} className="flex flex-col gap-3 w-full mt-8">
        {!success && error?.message && (
          <AlertBox
            key={error.status}
            variant="destructive"
            description={error?.message}
          />
        )}

        {success && (
          <AlertBox
            variant="default"
            description="If an account exists with that email, you will receive a password reset link shortly."
          />
        )}

        <Input
          name={"email"}
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
          errors={error?.cause?.email?._errors}
          disabled={success}
        />

        <Button
          size={"lg"}
          className="font-bold shadow-none group mt-4"
          disabled={pending || success}
        >
          Send Reset Link
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Card>
  );
}
