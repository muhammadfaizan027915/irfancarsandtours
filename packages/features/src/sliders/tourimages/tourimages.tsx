"use client";

import { useEffect, useState } from "react";

import { AppImage as Image } from "@icat/ui/components/app-image";
import { SliderContainer } from "@icat/ui/components/slider-container";

export type TourImagesProps = {
  imageUrls?: string[] | null;
};

export function TourImages({ imageUrls }: TourImagesProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!imageUrls?.length) return null;

  if (!ready && imageUrls?.length) {
    return <div className="w-full h-120 bg-muted animate-pulse rounded-xl" />;
  }

  return (
    <div className="relative w-full min-w-0">
      <SliderContainer slidesPerView={[1, 1, 1]}>
        {imageUrls?.map((url) => (
          <Image
            key={url}
            src={url}
            alt="Tour"
            height={400}
            width={800}
            className="w-full h-40 md:h-120 lg:h-180 object-cover rounded-xl"
            sizes="(max-width: 768px) 80vw, 100vw"
            quality={90}
          />
        ))}
      </SliderContainer>
    </div>
  );
}
