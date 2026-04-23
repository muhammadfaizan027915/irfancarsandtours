"use client";

import { useCallback, Children, ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@icat/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderContainerProps {
  children: ReactNode | ReactNode[];
  slidesPerView?: [number, number, number];
  className?: string;
  arrows?: boolean;
  autoplay?: boolean;
  loop?: boolean;
}

export function SliderContainer({
  children,
  slidesPerView = [1, 2, 4],
  className = "",
  arrows = true,
  autoplay = true,
  loop = true,
}: SliderContainerProps) {
  const [mobile, tablet, desktop] = slidesPerView;

  const options = {
    loop,
    align: "start",
    slidesToScroll: 1,
  } as const;

  const plugins = autoplay
    ? [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const cssVars = {
    "--slides-mobile": `${100 / mobile}%`,
    "--slides-tablet": `${100 / tablet}%`,
    "--slides-desktop": `${100 / desktop}%`,
  } as React.CSSProperties;

  return (
    <div className={`relative ${className}`} style={cssVars}>
      {arrows && (
        <Button
          size="icon"
          variant="secondary"
          aria-label="Previous"
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full hidden sm:flex"
          onClick={scrollPrev}
        >
          <ChevronLeft />
        </Button>
      )}

      <div className="embla-viewport overflow-hidden" ref={emblaRef}>
        <div className="embla-container flex">
          {Children.toArray(children).map((child, index) => (
            <div key={index} className="embla-slide shrink-0 min-w-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {arrows && (
        <Button
          size="icon"
          variant="secondary"
          aria-label="Next"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full hidden sm:flex"
          onClick={scrollNext}
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
}
