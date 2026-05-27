"use client";

import { ArrowRight, Mail, UserRound } from "lucide-react";
import { useActionState, useEffect } from "react";

import { AlertBox } from "@icat/ui/components/alert";
import { Button } from "@icat/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@icat/ui/components/card";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";
import { toast } from "@icat/ui/components/sonner";
import { Textarea } from "@icat/ui/components/textarea";
import { sendComplaint } from "@icat/web/actions";

export function ComplaintForm() {
  const [result, action, pending] = useActionState(sendComplaint, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (success) {
      toast.success("Complaint sent successfully!", { position: "top-center" });
    }
  }, [success]);

  return (
    <div className="w-full space-y-6 pb-8">
      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">File a Complaint</CardTitle>
          <p className="text-muted-foreground">
            Let us know if something went wrong. We value your feedback.
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

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UserRound className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Your Information</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    name={"name"}
                    errors={error?.cause?.name?._errors}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    name={"email"}
                    errors={error?.cause?.email?._errors}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +1234567890"
                    name={"phone"}
                    errors={error?.cause?.phone?._errors}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t pt-8">
              <div className="flex items-center gap-2">
                <Mail className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Complaint Details</h2>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  className="min-h-48 resize-none"
                  placeholder="Tell us about your issue in detail..."
                  name={"message"}
                  errors={error?.cause?.message?._errors}
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                size="lg"
                className="px-12 font-bold shadow-lg group"
                disabled={pending}
              >
                Send Complaint
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
