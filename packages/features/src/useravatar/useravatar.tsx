"use client";

import { getSignedUploadUrl } from "@icat/web/actions/file";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Progress,
  toast,
} from "@icat/ui";
import { UserAvatarProps } from "./useravatar.types";
import { Pencil, UploadCloud } from "lucide-react";
import { getNameInitials } from "@icat/lib/utils";
import { useFileUpload } from "@icat/lib/hooks";
import { updateUser } from "@icat/web/actions";
import { useRef } from "react";

export function UserAvatar({ user }: UserAvatarProps) {
  const { isUploading, previewUrl, progress, uploadFile } = useFileUpload();
  const inputRef = useRef<HTMLInputElement>(null);
  const nameInitials = getNameInitials(user?.name);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedUrl = await uploadFile(event.target.files?.[0] as File);

    if (uploadedUrl) {
      const formData = new FormData();
      formData.append("image", uploadedUrl);
      const result = await updateUser(user, formData);

      if (result?.success) {
        toast.success("Profile image updated successfully.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <div className="relative">
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          size="icon"
          className="absolute top-4 right-4 z-10 rounded-full shadow-none"
          onClick={() => inputRef.current?.click()}
        >
          <Pencil />
        </Button>
        <Avatar className="w-60 h-60">
          <AvatarFallback>{nameInitials}</AvatarFallback>
          <AvatarImage
            className="object-cover"
            alt={user?.name ?? "User Avatar"}
            src={previewUrl ? previewUrl : user?.image ?? ""}
          />
        </Avatar>
        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-full">
            <UploadCloud className="text-white w-8 h-8 mb-2" />
            <Progress value={progress} className="w-32" />
          </div>
        )}
      </div>
      <h2 className="font-bold text-2xl mt-4">{user?.name}</h2>
      <p className="text-muted-foreground">{user?.email}</p>

      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl mt-4"}>
        Edit Profile
      </Badge>
    </div>
  );
}
