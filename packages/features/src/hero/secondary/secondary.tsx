import { Badge } from "@icat/ui";
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
    <div
      className={`flex justify-${position} items-center p-4 md:p-8 relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[400px] bg-cover bg-center`}
      style={{ backgroundImage: `url("${heroImageUrl}")` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        className={`flex flex-col items-${position} text-${FlexToTextPositionMap[position]} text-background dark:text-foreground z-10`}
      >
        {badge && (
          <Badge variant={"accent"} className={"px-6 py-2 md:px-8 md:py-3 text-sm rounded-lg"}>
            {badge}
          </Badge>
        )}
        {title && (
          <h1 className="text-4xl md:text-[55px] font-bold tracking-wide">
            {title}
          </h1>
        )}

        {subtitle && <p className="text-sm md:text-md">{subtitle}</p>}
      </div>
    </div>
  );
}
