"use client";

import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { CarCartCard } from "@icat/features/carcartlist/carcartcard";
import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { TourCartCard } from "@icat/features/tourcartlist/tourcartcard";
import { Button } from "@icat/ui/components/button";
import { EmptyMessage } from "@icat/ui/components/empty-message";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@icat/ui/components/sheet";
import { toast } from "@icat/ui/components/sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@icat/ui/components/tabs";
import { useCarCart, useTourCart } from "@icat/web/store";

export function CartSidebar() {
  const { carsList, clearCart: clearCarCart } = useCarCart();
  const { toursList, clearCart: clearTourCart } = useTourCart();
  const [activeTab, setActiveTab] = useState<"cars" | "tours">("cars");

  const handleClearCart = () => {
    if (activeTab === "cars" && carsList?.length) {
      clearCarCart();
      toast.success("Car cart cleared successfully!", {
        position: "top-center",
      });
    } else if (activeTab === "tours" && toursList?.length) {
      clearTourCart();
      toast.success("Tour cart cleared successfully!", {
        position: "top-center",
      });
    }
  };

  const hasItems =
    activeTab === "cars" ? !!carsList?.length : !!toursList?.length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"lg"}>
          <LayoutGrid />
        </Button>
      </SheetTrigger>
      <SheetClose />
      <SheetContent className="flex flex-col h-full overflow-y-auto gap-0">
        <SheetHeader className="border-b pb-4 shrink-0">
          <SheetTitle className="text-xl">Your Cart</SheetTitle>
        </SheetHeader>

        <Tabs
          defaultValue="cars"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "cars" | "tours")}
          className="flex-1 flex flex-col overflow-hidden px-2"
        >
          <TabsList className="grid w-full grid-cols-2 shrink-0">
            <TabsTrigger value="cars" className="h-8 p-2">
              Cars
            </TabsTrigger>
            <TabsTrigger value="tours" className="h-8 p-2">
              Tours
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cars" className="flex-1 overflow-y-auto pt-1">
            {carsList?.length ? (
              carsList?.map((car) => <CarCartCard car={car} key={car?.id} />)
            ) : (
              <EmptyMessage message="Your cart is empty!" />
            )}
          </TabsContent>

          <TabsContent value="tours" className="flex-1 overflow-y-auto pt-1">
            {toursList?.length ? (
              toursList?.map((tour) => (
                <TourCartCard tour={tour} key={tour?.id} />
              ))
            ) : (
              <EmptyMessage message="Your cart is empty!" />
            )}
          </TabsContent>
        </Tabs>

        <SheetFooter className="flex flex-row gap-2 border-t pt-4 w-full mt-auto shrink-0">
          <Button
            className="w-fit"
            variant="outline"
            onClick={handleClearCart}
            disabled={!hasItems}
          >
            Clear
          </Button>
          <Button
            className="flex-1"
            asChild={hasItems}
            disabled={!hasItems}
          >
            {hasItems ? (
              <Link
                href={
                  activeTab === "cars"
                    ? NavigationUrls.CHECKOUT_CARS
                    : NavigationUrls.CHECKOUT_TOURS
                }
              >
                Checkout
              </Link>
            ) : (
              <>Checkout</>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
