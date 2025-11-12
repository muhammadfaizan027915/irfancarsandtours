import Link from "next/link";
import Image from "next/image";
import { NavigationUrls } from "@icat/features/header/header.constants";

export function Logo() {
  return (
    <Link href={NavigationUrls.HOME}>
      <div className="overflow-hidden w-18 h-18">
        <Image
          alt="Irfan Cars And Tours"
          src={"/assets/logo.png"}
          height={150}
          width={150}
        />
      </div>
    </Link>
  );
}
