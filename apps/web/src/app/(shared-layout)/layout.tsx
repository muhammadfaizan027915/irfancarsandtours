import { Header } from "@icat/features/header";
import { Topbar } from "@icat/features/topbar";
import { ReactNode } from "react";

type SharedLayoutProps = {
  children: ReactNode;
};

export default function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <div className="relative h-full">
      <Topbar varient={"secondary"} />
      <Header varient={"secondary"} />

      <div className="px-4 sm:px-8 lg:px-16 py-8">{children}</div>
    </div>
  );
}
