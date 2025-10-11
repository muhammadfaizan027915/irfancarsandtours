import Image from "next/image";
import { Badge } from "@icat/ui/components/badge";
import { SecondaryHeroProps } from "./secondary.types";
import { FlexToTextPositionMap } from "@icat/features/common";

export function SecondaryHero({
  position = "center",
  badge,
  title,
  subtitle,
  heroImageUrl = "/assets/hero_bakground_secondary.jpg",
}: SecondaryHeroProps) {
  return (
    <section className="relative flex overflow-hidden rounded-2xl min-h-[320px] md:min-h-[400px] p-4 md:p-8 items-center justify-center">
      <Image
        src={heroImageUrl}
        alt={title || "Secondary hero background"}
        fill
        priority
        sizes="100vw"
        quality={80}
        className="object-cover object-center -z-10"
      />

      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      <div
        className={`flex flex-col items-${position} text-${FlexToTextPositionMap[position]} text-background dark:text-foreground z-10`}
      >
        {badge && (
          <Badge
            variant="accent"
            className="px-6 py-2 md:px-8 md:py-3 text-sm rounded-lg"
          >
            {badge}
          </Badge>
        )}

        {title && (
          <h1 className="text-4xl md:text-[55px] font-bold tracking-wide">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="text-sm md:text-md mt-2 md:mt-3 opacity-90">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
