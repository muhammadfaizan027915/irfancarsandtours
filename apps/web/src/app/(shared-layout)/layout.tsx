import { Header, Topbar } from "@icat/features";
import { ReactNode } from "react";

type SharedLayoutProps = {
  children: ReactNode;
};

export default function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <div className="relative h-full">
      <Topbar varient={"secondary"} />
      <Header varient={"secondary"} />

      {children}
    </div>
  );
}
