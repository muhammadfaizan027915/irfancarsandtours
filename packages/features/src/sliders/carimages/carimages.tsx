"use client";
import { useEffect, useState } from "react";
import { SliderContainer } from "@icat/ui/components/slider-container";
import { CarImagesProps } from "./carimages.types";
import Image from "next/image";

export function CarImages({ imageUrls }: CarImagesProps) {
  const [ready, setReady] = useState(false);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      <SliderContainer settings={settings}>
        {imageUrls?.map((url) => (
          <Image
            key={url}
            src={url}
            alt="Car"
            height={200}
            width={480}
            className="w-full h-120 object-cover rounded-xl"
            sizes="(max-width: 768px) 50px, 100px"
            quality={70}
          />
        ))}
      </SliderContainer>
    </div>
  );
}
