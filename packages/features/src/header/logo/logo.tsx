import Link from "next/link";
import Image from "next/image";
import { NavigationUrls } from "@icat/features/header/header.constants";

export function Logo() {
  return (
    <h1 className={"font-bold text-6xl uppercase"}>
      <Link href={NavigationUrls.HOME}>
        <Image
          alt="Irfan Cars And Tours"
          src={"/assets/logo.png"}
          height={150}
          width={150}
        />
      </Link>
    </h1>
  );
}
