export type ProfileImageUploaderProps = {
  initialImage?: string | null;
  userName?: string;
  onUploadSuccess?: (url: string) => void;
  onUploadingChange?: (isUploading: boolean) => void;
  name?: string;
  className?: string;
  avatarClassName?: string;
  label?: string;
}
