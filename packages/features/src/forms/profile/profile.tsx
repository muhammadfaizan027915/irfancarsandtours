"use client";

import { AlertBox, Button, Card, Input, Textarea, toast } from "@icat/ui";
import {
  ArrowRight,
  Mail,
  Phone,
  UserRound,
  MapPin,
  IdCard,
} from "lucide-react";
import { updateUser } from "@icat/web/actions";
import { ProfileFormProps } from "./profile.types";
import { useActionState, useEffect } from "react";

export function ProfileForm({ user }: ProfileFormProps) {
  const [result, action] = useActionState(updateUser, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully.", {
        position: "top-center",
      });
    }
  }, [result]);

  return (
    <Card className="w-full p-8 flex flex-col items-center gap-2 shadow-none">
      <h1 className="font-bold text-4xl">Update Your Profile</h1>

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
          defaultValue={user?.name}
          errors={error?.cause?.name?._errors}
        />

        <Input
          disabled
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
          defaultValue={user?.email}
        />

        <Input
          type="tel"
          placeholder="Phone"
          startIcon={<Phone size={18} />}
          name={"phone"}
          defaultValue={user?.phone ?? ""}
          errors={error?.cause?.phone?._errors}
        />

        <Input
          id="cnic"
          placeholder="CNIC"
          startIcon={<IdCard size={18} />}
          name={"cnic"}
          defaultValue={user?.cnic ?? ""}
          errors={error?.cause?.cnic?._errors}
        />

        <Textarea
          className="h-30 scrollbar-thin"
          placeholder="Address"
          startIcon={<MapPin size={20} />}
          name={"address"}
          defaultValue={user.address ?? ""}
          errors={error?.cause?.address?._errors}
        />

        <Button size={"lg"} className="font-bold shadow-none group mt-4">
          Update Profile
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Card>
  );
}
