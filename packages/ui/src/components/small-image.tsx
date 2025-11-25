import Image from "next/image";
import { cn } from "../lib/utils";

type SmallImageProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export function SmallImage({ src, alt, className }: SmallImageProps) {
  return src ? (
    <div className="flex items-center">
      <Image
        alt={alt as string}
        src={src}
        width={50}
        height={50}
        className={cn("w-24 h-24 rounded-md object-cover", className)}
      />
    </div>
  ) : (
    <div className="flex items-center">
      <div
        className={cn(
          "w-24 h-24 rounded-md bg-muted flex items-center justify-center",
          className
        )}
      >
        <span className="text-xs text-muted-foreground">No Image</span>
      </div>
    </div>
  );
}
