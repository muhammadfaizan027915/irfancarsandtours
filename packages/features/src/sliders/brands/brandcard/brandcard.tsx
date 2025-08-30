import { Card } from "@icat/ui";
import { BrandCardProps } from "./brandcard.types";
import { NavigationUrls } from "../../../header";
import Link from "next/link";

export function BrandCard({ brandIcon: BrandIcon }: BrandCardProps) {
  return (
    <Card className="shadow-none p-4 w-fit">
      <Link href={NavigationUrls.CARS}>
        <BrandIcon fontSize={60} fill="currentColor" stroke="currentColor" />
      </Link>
    </Card>
  );
}
