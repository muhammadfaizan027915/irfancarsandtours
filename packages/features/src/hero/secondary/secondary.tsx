import { Header } from "../../header";
import { Topbar } from "../../topbar";

export function SecondaryHero() {
  return (
    <div className="h-screen w-full">
      <div className="relative h-full">
        <Topbar varient={"secondary"} />
        <Header varient={"secondary"} />
      </div>
    </div>
  );
}
