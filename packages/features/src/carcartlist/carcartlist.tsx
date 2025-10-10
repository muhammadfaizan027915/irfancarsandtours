"use client";

import { Card, CardContent, CardHeader } from "@icat/ui/components/card";
import { EmptyCarCartMessage } from "@icat/features/sidebars/carcartsidebar/emptycarcartmessage";
import { useCarCart } from "@icat/web/store";
import { CarCartCard } from "./carcartcard";

export function CarCartList() {
  const { carsList } = useCarCart();

  return (
    <Card className="shadow-none rounded-xl gap-2">
      <CardHeader>
        <h1 className="text-start text-2xl font-bold">Your Cart</h1>
      </CardHeader>
      <CardContent className="grid gap-3">
        {carsList?.length ? (
          carsList?.map((car) => <CarCartCard car={car} key={car?.id} />)
        ) : (
          <EmptyCarCartMessage />
        )}
      </CardContent>
    </Card>
  );
}
