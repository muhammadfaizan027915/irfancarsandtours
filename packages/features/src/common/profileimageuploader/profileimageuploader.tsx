"use client";

import { Pencil, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useFileUpload } from "@icat/lib/hooks";
import { getNameInitials } from "@icat/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@icat/ui/components/avatar";
import { Button } from "@icat/ui/components/button";
import { Progress } from "@icat/ui/components/progress";
import { cn } from "@icat/ui/lib/utils";

import { ProfileImageUploaderProps } from "./profileimageuploader.types";

export function ProfileImageUploader({
  initialImage,
  userName = "New User",
  onUploadSuccess,
  onUploadingChange,
  name = "image",
  className,
  avatarClassName,
  label = "Profile Picture",
}: ProfileImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, previewUrl, progress, uploadFile } = useFileUpload();
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading, onUploadingChange]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFile(file);
      if (url) {
        setUploadedUrl(url);
        onUploadSuccess?.(url);
      }
    }
  };

  const currentImage = uploadedUrl || previewUrl || initialImage;
  const initials = getNameInitials(userName);

  return (
    <div className={cn("flex flex-col items-center gap-4 mb-6", className)}>
      <div className="relative">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          size="icon"
          className="absolute top-2 right-2 z-10 rounded-full shadow-none"
          onClick={handleImageClick}
          disabled={isUploading}
        >
          <Pencil size={18} />
        </Button>
        <Avatar className={cn("h-48 w-48 border-2 border-primary/10", avatarClassName)}>
          <AvatarImage
            src={currentImage || ""}
            className="object-cover"
          />
          <AvatarFallback className="text-4xl font-bold bg-primary/5">
            {initials}
          </AvatarFallback>
        </Avatar>
        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-full">
            <UploadCloud className="text-white w-8 h-8 mb-2" />
            <Progress value={progress} className="w-32" />
          </div>
        )}
      </div>
      {name && <input type="hidden" name={name} value={currentImage || ""} />}
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}
