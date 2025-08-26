import { Header } from "../../header";
import { Topbar } from "../../topbar";

export function PrimrayHero() {
  return (
    <div className="h-screen w-full bg-[url('/assets/hero_background.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative h-full text-background dark:text-foreground">
        <Topbar varient={"primary"} />
        <Header varient={"primary"} />
      </div>
    </div>
  );
}
