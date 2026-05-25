"use client";

import {
  ArrowRight,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { useActionState, useEffect } from "react";

import { AlertBox } from "@icat/ui/components/alert";
import { Button } from "@icat/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@icat/ui/components/card";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";
import { toast } from "@icat/ui/components/sonner";
import { Textarea } from "@icat/ui/components/textarea";
import { updateUser } from "@icat/web/actions";

import { ProfileFormProps } from "./profile.types";

export function ProfileForm({ user }: ProfileFormProps) {
  const [result, action, pending] = useActionState(updateUser, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully.", {
        position: "top-center",
      });
    }
  }, [success]);

  return (
    <div className="w-full space-y-6 pb-8">
      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Update Your Profile</CardTitle>
          <p className="text-muted-foreground">
            Manage your personal information and contact details.
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

            {/* Account Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UserRound className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Account Information</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    defaultValue={user?.name}
                    errors={error?.cause?.name?._errors}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    disabled
                    placeholder="Email address"
                    defaultValue={user?.email}
                  />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 border-t pt-8">
              <div className="flex items-center gap-2">
                <Phone className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Contact Details</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. +1234567890"
                    defaultValue={user?.phone ?? ""}
                    errors={error?.cause?.phone?._errors}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnic">National ID / CNIC</Label>
                  <Input
                    id="cnic"
                    name="cnic"
                    placeholder="Enter ID number"
                    defaultValue={user?.cnic ?? ""}
                    errors={error?.cause?.cnic?._errors}
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4 border-t pt-8">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Location</h2>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter your residential address"
                  className="min-h-24 resize-none"
                  defaultValue={user.address ?? ""}
                  errors={error?.cause?.address?._errors}
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                size={"lg"}
                className="px-12 font-bold shadow-lg group"
                disabled={pending}
              >
                Update Profile
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
