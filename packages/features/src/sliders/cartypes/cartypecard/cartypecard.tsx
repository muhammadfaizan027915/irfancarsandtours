import { CarPlaceHolderImageUrl } from "@icat/features/common";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { Button } from "@icat/ui/components/button";
import { ArrowRight } from "lucide-react";

import { CarTypeCardProps } from "./cartypecard.types";
import Image from "next/image";
import Link from "next/link";

export function CarTypeCard({ name, image }: CarTypeCardProps) {
  return (
    <Link href={`${NavigationUrls.CARS}?carType=${name}`}>
      <div className="border border-border rounded-xl p-4 hover:shadow-2xl hover:-translate-y-1 duration-300 transition-normal">
        <div className="h-30 relative rounded-lg overflow-hidden">
          <Image
            width={150}
            height={150}
            src={CarPlaceHolderImageUrl}
            alt={name ?? ""}
            className="w-full h-full object-cover object-center"
            sizes="(max-width: 768px) 150px, 250px"
            quality={70}
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
