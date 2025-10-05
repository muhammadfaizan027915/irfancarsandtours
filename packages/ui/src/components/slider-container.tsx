"use client";

import { useRef, ReactNode } from "react";
import Slider, { Settings } from "react-slick";
import { Button } from "@icat/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderContainerProps {
  children: ReactNode;
  settings?: Settings;
  className?: string;
  arrows?: boolean;
}

export function SliderContainer({
  children,
  settings,
  className = "",
  arrows = true,
}: SliderContainerProps) {
  const sliderRef = useRef<Slider>(null);

  const defaultSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1048, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    ...settings,
  };

  return (
    <div className={`relative ${className}`}>
      {arrows && (
        <Button
          size="icon"
          variant="secondary"
          aria-label="Previous"
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <ChevronLeft />
        </Button>
      )}

      <Slider ref={sliderRef} {...defaultSettings}>
        {children}
      </Slider>

      {arrows && (
        <Button
          size="icon"
          variant="secondary"
          aria-label="Next"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
}
