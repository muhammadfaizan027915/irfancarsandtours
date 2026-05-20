"use client";

import { ArrowRight, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";

import { AlertBox } from "@icat/ui/components/alert";
import { Badge } from "@icat/ui/components/badge";
import { Button } from "@icat/ui/components/button";
import { Card } from "@icat/ui/components/card";
import { Input } from "@icat/ui/components/input";
import { toast } from "@icat/ui/components/sonner";
import { resetPassword } from "@icat/web/actions";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [result, action, pending] = useActionState(resetPassword, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (success) {
      toast.success("Password reset successfully! You can now sign in.", {
        position: "top-center",
      });
    }
  }, [success]);

  return (
    <Card className="w-full p-6 md:p-8 max-w-md flex flex-col items-center gap-2 shadow-none">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Reset Password
      </Badge>

      <h1 className="font-bold text-4xl text-center">New Password</h1>
      <p className="text-muted-foreground text-sm text-center mt-2">
        Please enter your new password below.
      </p>

      <form action={action} className="flex flex-col gap-3 w-full mt-8">
        {!success && error?.message && (
          <AlertBox
            key={error.status}
            variant="destructive"
            description={error?.message}
          />
        )}

        <input type="hidden" name="token" value={token ?? ""} />

        <Input
          type="password"
          name={"password"}
          placeholder="New Password"
          startIcon={<Lock size={18} />}
          errors={error?.cause?.password?._errors}
          disabled={success}
        />

        <Input
          type="password"
          name={"confirmPassword"}
          placeholder="Confirm New Password"
          startIcon={<Lock size={18} />}
          errors={error?.cause?.confirmPassword?._errors}
          disabled={success}
        />

        <Button
          size={"lg"}
          className="font-bold shadow-none group mt-4"
          disabled={pending || success}
        >
          Reset Password
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Card>
  );
}
