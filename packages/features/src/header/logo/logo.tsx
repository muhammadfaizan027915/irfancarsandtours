import Link from "next/link";
import { NavigationUrls } from "@icat/features/header/header.constants";

export function Logo() {
  return (
    <h1 className={"font-bold text-6xl uppercase"}>
      <Link href={NavigationUrls.HOME}> Icat</Link>
    </h1>
  );
}
