"use client";

import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";
import { toast } from "@icat/ui/components/sonner";
import { AlertBox } from "@icat/ui/components/alert";
import { Button } from "@icat/ui/components/button";
import { Textarea } from "@icat/ui/components/textarea";
import { Card, CardTitle, CardContent } from "@icat/ui/components/card";
import { ArrowRight, Mail, Phone, UserRound } from "lucide-react";
import { useActionState, useEffect } from "react";
import { sendMessage } from "@icat/web/actions/contact";

export function ContactForm() {
  const [result, action, pending] = useActionState(sendMessage, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (success) {
      toast.success("Message sent successfully!", { position: "top-center" });
    }
  }, [result]);

  return (
    <Card className="shadow-none">
      <CardContent>
        <CardTitle className="font-bold text-4xl md:text-5xl">
          Get in Touch
        </CardTitle>

        <form action={action} className="mt-4 flex flex-col gap-4">
          {!success && error?.message && (
            <AlertBox
              key={error.status}
              variant="destructive"
              description={error?.message}
            />
          )}

          <Label>Name</Label>
          <Input
            type="text"
            placeholder="Name"
            startIcon={<UserRound size={18} />}
            name={"name"}
            errors={error?.cause?.name?._errors}
          />

          <Label>Email Address</Label>
          <Input
            type="email"
            placeholder="Email Address"
            startIcon={<Mail size={18} />}
            name={"email"}
            errors={error?.cause?.email?._errors}
          />

          <Label>Phone Number</Label>
          <Input
            type="tel"
            placeholder="Phone Number"
            startIcon={<Phone size={18} />}
            name={"phone"}
            errors={error?.cause?.phone?._errors}
          />

          <Label>Message</Label>
          <Textarea
            className="min-h-48"
            placeholder="Leave us a message..."
            name={"message"}
            errors={error?.cause?.message?._errors}
          />

          <Button
            size="lg"
            className="font-bold shadow-none group mt-4"
            disabled={pending}
          >
            Send Message
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
