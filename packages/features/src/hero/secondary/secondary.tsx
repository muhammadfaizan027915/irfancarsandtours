import { Badge } from "@icat/ui";
import { Header } from "../../header";
import { Topbar } from "../../topbar";
import { Searchbar } from "../../searchbar";

export function SecondaryHero() {
  return (
    <>
      <div className="relative h-full">
        <Topbar varient={"secondary"} />
        <Header varient={"secondary"} />

        <div className="px-16 pt-8">
          <div className="relative rounded-2xl overflow-hidden min-h-[400px] bg-[url('/assets/hero_bakground_secondary.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="flex flex-col items-center absolute top-2/5 left-1/2 -translate-y-1/2 -translate-x-1/2 text-background dark:text-foreground">
              <Badge
                className={
                  "px-8 py-3 rounded-lg text-sm bg-accent dark:bg-accent-foreground font-medium"
                }
              >
                Find cars for sale and for rent near you
              </Badge>
              <h1 className="text-[55px] font-bold tracking-wide">
                Find Your Perfect Car
              </h1>
              <p>Search and find your best car rental with easy way</p>
            </div>
          </div>
        </div>
      </div>

      <Searchbar defaultTab="cars" />
    </>
  );
}
