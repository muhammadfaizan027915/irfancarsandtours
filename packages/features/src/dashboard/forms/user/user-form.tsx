"use client";

import {
  ArrowRight,
  Lock,
  MapPin,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { DetailedUserResponseDto } from "@icat/contracts";
import { ProfileImageUploader } from "@icat/features/common/profileimageuploader";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import {
  AlertBox,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  toast,
} from "@icat/ui";
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
    if (result?.success) {
      toast.success(
        isUpdate ? "User updated successfully." : "User created successfully.",
        {
          position: "top-center",
        },
      );
      if (!isUpdate) {
        router.push(DashboardNavigationUrls.CUSTOMERS);
      }
    }
  }, [result, isUpdate, router]);

  return (
    <div className="w-full space-y-6 pb-8">
      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">
            {isUpdate ? "Update User Profile" : "Create New User"}
          </CardTitle>
          <p className="text-muted-foreground">
            {isUpdate
              ? "Update existing user information and security settings."
              : "Register a new user account for the platform."}
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

            <ProfileImageUploader
              initialImage={user?.image}
              userName={user?.name}
              onUploadingChange={setIsUploading}
            />

            {isUpdate && <input type="hidden" name="id" value={user?.id} />}

            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UserRound className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Basic Information</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    defaultValue={user?.name}
                    errors={error?.cause?.name?._errors}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    defaultValue={user?.email}
                    disabled={isUpdate}
                    errors={error?.cause?.email?._errors}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="e.g. +92 300 0000000"
                    defaultValue={user?.phone ?? ""}
                    errors={error?.cause?.phone?._errors}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnic">National ID / CNIC</Label>
                  <Input
                    id="cnic"
                    name="cnic"
                    placeholder="ID Number"
                    defaultValue={user?.cnic ?? ""}
                    errors={error?.cause?.cnic?._errors}
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Security Settings</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {isUpdate ? "New Password (optional)" : "Password"}
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    errors={error?.cause?.password?._errors}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    errors={error?.cause?.confirmPassword?._errors}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Address & Location</h2>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Residential Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter full residential address"
                  className="min-h-24 resize-none"
                  defaultValue={user?.address ?? ""}
                  errors={error?.cause?.address?._errors}
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                size={"lg"}
                className="px-12 font-bold shadow-lg group"
                disabled={pending || isUploading}
              >
                {isUpdate ? "Save Changes" : "Create User"}
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
