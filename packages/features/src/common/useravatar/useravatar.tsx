"use client";

import { ProfileImageUploader } from "@icat/features/common/profileimageuploader";
import { Badge } from "@icat/ui/components/badge";
import { toast } from "@icat/ui/components/sonner";
import { updateUser } from "@icat/web/actions";

import { UserAvatarProps } from "./useravatar.types";

export function UserAvatar({ user }: UserAvatarProps) {
  const handleUploadSuccess = async (uploadedUrl: string) => {
    const formData = new FormData();
    formData.append("image", uploadedUrl);
    const result = await updateUser(user, formData);

    if (result?.success) {
      toast.success("Profile image updated successfully.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="p-6 md:p-8 flex flex-col items-center">
      <ProfileImageUploader
        initialImage={user?.image}
        userName={user?.name}
        onUploadSuccess={handleUploadSuccess}
        avatarClassName="w-60 h-60"
        name={""}
        label={""}
      />
      <h2 className="font-bold text-2xl mt-4">{user?.name}</h2>
      <p className="text-muted-foreground">{user?.email}</p>

      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl mt-4"}>
        Edit Profile
      </Badge>
    </div>
  );
}
