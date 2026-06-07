"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@icat/ui";
import { cn } from "@icat/ui/lib/utils";

export type BookingsHeaderTab = {
  label: string;
  href: string;
  isActive?: boolean;
};

export type BookingsHeaderProps = {
  tabs: BookingsHeaderTab[];
};

export function BookingsHeader({ tabs }: BookingsHeaderProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center">
      {tabs.map((tab, index) => {
        const isActive = tab.isActive ?? pathname === tab.href;

        return (
          <Link href={tab.href} passHref key={tab.label}>
            <Button
              variant={isActive ? "default" : "outline"}
              className={cn(
                index === 0 && tabs.length > 1 && "rounded-r-none",
                index === tabs.length - 1 && tabs.length > 1 && "rounded-l-none",
                index > 0 && index < tabs.length - 1 && "rounded-none"
              )}
            >
              {tab.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
