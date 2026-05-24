"use client";

import {
  ArrowRight,
  IdCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { DetailedUserResponseDto } from "@icat/contracts";
import { ProfileImageUploader } from "@icat/features/common/profileimageuploader";
import { AlertBox } from "@icat/ui/components/alert";
import { Button } from "@icat/ui/components/button";
import { Card, CardContent } from "@icat/ui/components/card";
import { Input } from "@icat/ui/components/input";
import { toast } from "@icat/ui/components/sonner";
import { Textarea } from "@icat/ui/components/textarea";
import { createUser, updateUserById } from "@icat/web/actions";

export type UserFormProps = {
  user?: DetailedUserResponseDto;
};

export function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const isUpdate = !!user;
  const [result, action, pending] = useActionState(
    isUpdate ? updateUserById : createUser,
    null,
  );

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (success) {
      toast.success(
        isUpdate ? "User updated successfully." : "User created successfully.",
        {
          position: "top-center",
        },
      );
      if (!isUpdate) {
        router.push("/dashboard/customers");
      }
    }
  }, [success, isUpdate, router]);

  return (
    <Card className="w-full shadow-none">
      <CardContent>
        <form action={action} className="flex flex-col gap-3 w-full mt-4">
          {error?.message && (
            <AlertBox
              key={error.status}
              variant="destructive"
              description={error?.message}
            />
          )}

          <ProfileImageUploader
            initialImage={user?.image}
            userName={user?.name}
            onUploadingChange={setIsUploading}
          />

          <h1 className="font-bold text-2xl">
            {isUpdate ? "Update User Profile" : "Create New User"}
          </h1>

          {isUpdate && <input type="hidden" name="id" value={user?.id} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Full Name"
              startIcon={<UserRound size={18} />}
              name={"name"}
              defaultValue={user?.name}
              errors={error?.cause?.name?._errors}
            />

            <Input
              type="email"
              placeholder="Email Address"
              startIcon={<Mail size={18} />}
              name={"email"}
              defaultValue={user?.email}
              disabled={isUpdate}
              errors={error?.cause?.email?._errors}
            />

            <Input
              type="tel"
              placeholder="Phone Number"
              startIcon={<Phone size={18} />}
              name={"phone"}
              defaultValue={user?.phone ?? ""}
              errors={error?.cause?.phone?._errors}
            />

            <Input
              id="cnic"
              placeholder="CNIC / ID Number"
              startIcon={<IdCard size={18} />}
              name={"cnic"}
              defaultValue={user?.cnic ?? ""}
              errors={error?.cause?.cnic?._errors}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="password"
              placeholder={isUpdate ? "New Password (optional)" : "Password"}
              startIcon={<Lock size={18} />}
              name={"password"}
              errors={error?.cause?.password?._errors}
            />
            <Input
              type="password"
              placeholder={
                isUpdate ? "Confirm New Password" : "Confirm Password"
              }
              startIcon={<Lock size={18} />}
              name={"confirmPassword"}
              errors={error?.cause?.confirmPassword?._errors}
            />
          </div>

          <Textarea
            className="h-30 scrollbar-thin"
            placeholder="Residential Address"
            startIcon={<MapPin size={20} />}
            name={"address"}
            defaultValue={user?.address ?? ""}
            errors={error?.cause?.address?._errors}
          />

          <Button
            size={"lg"}
            className="font-bold shadow-none group mt-4 w-full md:w-fit"
            disabled={pending || isUploading}
          >
            {isUpdate ? "Save Changes" : "Create User"}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
