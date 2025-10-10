import { Card } from "@icat/ui";
import { BrandCardProps } from "./brandcard.types";
import { NavigationUrls } from "@icat/features/header";
import Link from "next/link";

export function BrandCard({ brandName, brandIcon: BrandIcon }: BrandCardProps) {
  return (
    <Card className="shadow-none p-4 w-fit">
      <Link href={`${NavigationUrls.CARS}?brand=${brandName}`}>
        <BrandIcon fontSize={60} fill="currentColor" stroke="currentColor" />
      </Link>
    </Card>
  );
}
