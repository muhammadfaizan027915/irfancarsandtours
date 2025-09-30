"use client";

import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  toast,
} from "@icat/ui";
import { useCarCart } from "@icat/web/store";
import { CarCartCard } from "../../carcartlist/carcartcard";
import { EmptyCarCartMessage } from "./emptycarcartmessage";
import { NavigationUrls } from "../../header";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";

export function CarCartSidebar() {
  const { carsList, clearCart } = useCarCart();

  const handleClearCart = () => {
    if (carsList?.length) {
      clearCart();

      toast.success("Cart cleared successfully!", {
        position: "top-center",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"lg"} className="shadow-none">
          <LayoutGrid />
        </Button>
      </SheetTrigger>
      <SheetClose />
      <SheetContent>
        <SheetHeader className="border-b">
          <SheetTitle className="text-xl">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto p-2 space-y-4">
          {carsList?.length ? (
            carsList?.map((car) => <CarCartCard car={car} key={car?.id} />)
          ) : (
            <EmptyCarCartMessage />
          )}
        </div>

        <SheetFooter className="flex flex-row gap-2 border-t w-full">
          <Button
            className="w-fit shadow-none"
            variant="outline"
            onClick={handleClearCart}
          >
            Clear
          </Button>
          <Button
            className="flex-1 shadow-none"
            asChild={!!carsList?.length}
            disabled={!carsList?.length}
          >
            {carsList?.length ? (
              <Link href={NavigationUrls.CHECKOUT}>Checkout</Link>
            ) : (
              <>Checkout</>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
