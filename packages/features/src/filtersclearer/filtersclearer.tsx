"use client";

import { Button } from "@icat/ui";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function FiltersClearer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasParams = searchParams.toString().length > 0;

  const handleClear = () => {
    router.push(pathname, { scroll: false });
  };

  return <Button onClick={handleClear} size={"lg"} className="ml-auto shadow-none">Clear Filters</Button>;
}
