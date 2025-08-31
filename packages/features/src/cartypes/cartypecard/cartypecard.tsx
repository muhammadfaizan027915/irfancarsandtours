import { NavigationUrls } from "@icat/features/header";
import { Badge, Button } from "@icat/ui";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CarTypeCard() {
  return (
    <Link href={NavigationUrls.CARS}>
      <div className="border border-border rounded-xl p-4 hover:-translate-y-1 duration-300 transition-transform">
        <div className="h-30 relative rounded-lg overflow-hidden">
          <Image
            fill
            src={"/assets/hero_background_primary.jpg"}
            alt=""
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        <div className="mt-4">
          <h4 className="text-xl font-bold">SUV</h4>

          <div className="flex items-center justify-between">
            <Badge
              variant={"outline"}
              className="bg-muted px-3 py-1 rounded-xl"
            >
              24 Vahicles
            </Badge>

            <Button size={"sm"} className="rounded-3xl bg-muted dark:not-[:hover]:text-muted-foreground w-8 h-8 shadow-none">
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
