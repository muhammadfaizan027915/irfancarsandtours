"use client";

import { Card } from "@icat/ui/components/card";
import { toast } from "@icat/ui/components/sonner";
import { Input } from "@icat/ui/components/input";
import { Button } from "@icat/ui/components/button";
import { AlertBox } from "@icat/ui/components/alert";
import { ArrowRight, Lock } from "lucide-react";
import { changeUserPassword } from "@icat/web/actions";
import { useActionState, useEffect } from "react";

export function ChangePasswordForm() {
  const [result, action] = useActionState(changeUserPassword, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (success) {
      toast.success("Password changed successfully!", {
        position: "top-center",
      });
    }
  }, [result]);

  return (
    <Card className="w-full p-8 flex flex-col items-center gap-2 shadow-none">
      <h1 className="font-bold text-4xl">Change Password</h1>

      <form action={action} className="flex flex-col gap-3 w-full mt-8">
        {!success && error?.message && (
          <AlertBox
            key={error.status}
            variant="destructive"
            description={error?.message}
          />
        )}

        <Input
          type="password"
          placeholder="Current Password"
          startIcon={<Lock size={18} />}
          name={"currentPassword"}
          errors={error?.cause?.currentPassword?._errors}
        />

        <Input
          type="password"
          placeholder="New Password"
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
          Change Password
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Card>
  );
}
