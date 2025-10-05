import { CarTypeCardProps } from "./cartypecard.types";
import { NavigationUrls } from "@icat/features/header";
import { Badge, Button } from "@icat/ui";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CarTypeCard({ name }: CarTypeCardProps) {
  return (
    <Link href={`${NavigationUrls.CARS}?carType=${name}`}>
      <div className="border border-border rounded-xl p-4 hover:shadow-2xl hover:-translate-y-1 duration-300 transition-normal">
        <div className="h-30 relative rounded-lg overflow-hidden">
          <Image
            fill
            src={"/assets/hero_background_primary.jpg"}
            alt=""
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold">{name}</h4>
            <Button
              size={"sm"}
              className="rounded-3xl bg-muted dark:not-[:hover]:text-muted-foreground w-8 h-8 shadow-none"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
