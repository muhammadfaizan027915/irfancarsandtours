import Link from "next/link";

import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { AppImage as Image } from "@icat/ui/components/app-image";

export function Logo() {
  return (
    <Link href={NavigationUrls.HOME}>
      <div className="overflow-hidden w-24 h-24 md:w-28 md:h-28">
        <Image
          loading={"eager"}
          alt="Irfan Cars And Tours"
          src={"/assets/logo.png"}
          height={150}
          width={150}
        />
      </div>
    </Link>
  );
}
