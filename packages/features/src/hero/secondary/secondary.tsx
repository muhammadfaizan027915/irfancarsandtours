import { Badge } from "@icat/ui";
import { SecondaryHeroProps } from "./secondary.types";

export function SecondaryHero({
  position = "center",
  badge,
  title,
  subtitle,
  heroImageUrl = "/assets/hero_bakground_secondary.jpg",
}: SecondaryHeroProps) {
  return (
    <div className="px-4 sm:px-8 md:px-16 pt-8">
      <div
        className={`flex justify-${position} items-center p-8 relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[400px] bg-cover bg-center`}
        style={{ backgroundImage: `url("${heroImageUrl}")` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div
          className={`flex flex-col items-${position} text-background dark:text-foreground z-10`}
        >
          {badge && (
            <Badge
              variant={"accent"}
              className={"px-8 py-3 text-sm rounded-lg"}
            >
              {badge}
            </Badge>
          )}
          {title && (
            <h1 className="text-[55px] font-bold tracking-wide">{title}</h1>
          )}

          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
