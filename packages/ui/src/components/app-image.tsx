"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "../lib/utils";

export function AppImage({ className, alt, ...props }: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={alt || ""}
      className={cn(
        "transition-all duration-700 ease-in-out",
        isLoading
          ? "blur-md bg-muted/50 grayscale"
          : "blur-0 bg-transparent grayscale-0",
        className
      )}
      onLoad={(event) => {
        setLoading(false);
        if (props.onLoad) {
          props.onLoad(event);
        }
      }}
    />
  );
}

