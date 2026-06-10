"use client";

import { EmptyMessage } from "@icat/ui/components/empty-message";
import { Card, CardContent, CardHeader } from "@icat/ui/components/card";
import { useTourCart } from "@icat/web/store";

import { TourCartCard } from "./tourcartcard";

export function TourCartList() {
  const { toursList } = useTourCart();

  return (
    <Card className="shadow-none rounded-xl gap-2">
      <CardHeader>
        <h1 className="text-start text-2xl font-bold">Your Cart</h1>
      </CardHeader>
      <CardContent className="grid gap-3">
        {toursList?.length ? (
          toursList?.map((tour) => <TourCartCard tour={tour} key={tour?.id} />)
        ) : (
          <EmptyMessage message="Your cart is empty!" />
        )}
      </CardContent>
    </Card>
  );
}

