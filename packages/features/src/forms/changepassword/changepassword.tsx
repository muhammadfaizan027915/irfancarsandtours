"use client";

import { ArrowRight, Lock } from "lucide-react";
import { useActionState, useEffect } from "react";

import { AlertBox } from "@icat/ui/components/alert";
import { Button } from "@icat/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@icat/ui/components/card";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";
import { toast } from "@icat/ui/components/sonner";
import { changeUserPassword } from "@icat/web/actions";

export function ChangePasswordForm() {
  const [result, action, pending] = useActionState(changeUserPassword, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (success) {
      toast.success("Password changed successfully!", {
        position: "top-center",
      });
    }
  }, [success]);

  return (
    <div className="w-full space-y-6 pb-8">
      <Card className="shadow-none border-destructive/20 bg-destructive/5">
        <CardHeader className="border-b border-destructive/10">
          <CardTitle className="text-2xl font-bold text-destructive">Security: Change Password</CardTitle>
          <p className="text-muted-foreground text-destructive/80">
            Ensure your account is secure by using a strong, unique password.
          </p>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <form action={action} className="space-y-8">
            {!success && error?.message && (
              <AlertBox
                key={error.status}
                variant="destructive"
                description={error?.message}
              />
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="size-5 text-destructive" />
                <h2 className="text-lg font-semibold">Update Credentials</h2>
              </div>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    name="currentPassword"
                    errors={error?.cause?.currentPassword?._errors}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter new password"
                      name="password"
                      errors={error?.cause?.password?._errors}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter new password"
                      name="confirmPassword"
                      errors={error?.cause?.confirmPassword?._errors}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                size={"lg"}
                variant="destructive"
                className="px-12 font-bold shadow-lg group"
                disabled={pending}
              >
                Change Password
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
