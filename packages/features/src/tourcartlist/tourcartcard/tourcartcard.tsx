"use client";

import { Minus, Plus, Trash2,Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { Button } from "@icat/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@icat/ui/components/card";
import { useTourCart } from "@icat/web/store";

import { TourCartCardProps } from "./tourcartcard.types";

export function TourCartCard({ tour }: TourCartCardProps) {
  const { updateParticipants, removeFromCart } = useTourCart();

  const handleIncrementAdults = (_e: MouseEvent) => {
    updateParticipants(tour.id, tour.adults + 1, tour.children);
  };

  const handleDecrementAdults = (_e: MouseEvent) => {
    updateParticipants(tour.id, Math.max(1, tour.adults - 1), tour.children);
  };

  const handleIncrementChildren = (_e: MouseEvent) => {
    updateParticipants(tour.id, tour.adults, tour.children + 1);
  };

  const handleDecrementChildren = (_e: MouseEvent) => {
    updateParticipants(tour.id, tour.adults, Math.max(0, tour.children - 1));
  };

  return (
    <Card className="flex flex-row gap-2 items-center p-3 rounded-xl shadow-none hover:shadow hover:-translate-y-1 duration-300 transition-normal relative group">
       <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-muted-foreground hover:text-destructive absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => removeFromCart(tour.id)}
      >
        <Trash2 size={16} />
      </Button>
      <Link href={`${NavigationUrls.TOURS}/${tour?.id}`}>
        <div className="relative w-24 h-20 rounded-lg overflow-hidden">
          <Image
            width={100}
            height={100}
            src={tour.imageUrls?.[0] || ""}
            alt={tour?.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </Link>

      <CardContent className="flex-1 p-0">
        <CardHeader className="p-0 pr-8">
          <CardTitle className="text-lg font-bold truncate">
            <Link href={`${NavigationUrls.TOURS}/${tour?.id}`} className="hover:underline">
              {tour?.name}
            </Link>
          </CardTitle>
        </CardHeader>

        <div className="text-sm text-muted-foreground flex gap-4">
          <span className="flex items-center">
             <Users size={16} className="mr-1" /> {tour.adults} Adults, {tour.children} Children
          </span>
        </div>

        <div className="flex items-center gap-4 mt-2">
           <div className="flex items-center gap-1">
             <span className="text-xs text-muted-foreground font-semibold mr-1">Adults:</span>
             <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={handleDecrementAdults}
              >
                <Minus size={14} />
              </Button>
              <span className="text-sm font-semibold w-3 text-center">{tour.adults}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={handleIncrementAdults}
              >
                <Plus size={14} />
              </Button>
           </div>
           
           <div className="flex items-center gap-1">
             <span className="text-xs text-muted-foreground font-semibold mr-1">Children:</span>
             <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={handleDecrementChildren}
              >
                <Minus size={14} />
              </Button>
              <span className="text-sm font-semibold w-3 text-center">{tour.children}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={handleIncrementChildren}
              >
                <Plus size={14} />
              </Button>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
