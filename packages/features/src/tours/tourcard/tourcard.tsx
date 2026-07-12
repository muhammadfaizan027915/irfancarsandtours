"use client";

import { Calendar, MapPin, ShoppingCart,Users } from "lucide-react";
import Link from "next/link";

import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { AppImage as Image } from "@icat/ui/components/app-image";
import { Button } from "@icat/ui/components/button";
import { toast } from "@icat/ui/components/sonner";
import { useTourCart } from "@icat/web/store";

import { TourCardProps } from "./tourcard.types";

export function TourCard({ tour }: TourCardProps) {
  const { addToCart } = useTourCart();
  const imageUrl = tour.imageUrls?.[0];

  const handleAddToCart = () => {
    if (tour) {
      addToCart({ ...tour, adults: 1, children: 0 });

      toast.success("Tour successfully added to cart.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="border border-border rounded-xl hover:shadow-2xl hover:-translate-y-1 duration-300 transition-normal overflow-hidden">
      <Link href={`${NavigationUrls.TOURS}/${tour?.slug || tour?.id}`}>
        <div className="h-56 relative">
          <Image
            width={250}
            height={250}
            alt={tour.name}
            src={imageUrl || "/assets/placeholder-tour.jpg"}
            className="w-full h-full object-cover object-center"
            sizes="(max-width: 768px) 150px, 250px"
            quality={90}
          />
        </div>
      </Link>

      <div className="p-6 pt-8 bg-card rounded-2xl flex flex-col gap-6">
        <h4 className="text-2xl font-bold line-clamp-1">
          <Link href={`${NavigationUrls.TOURS}/${tour?.slug || tour?.id}`}>{tour.name}</Link>
        </h4>
        <hr className="border-t border-border" />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <span className="flex items-center text-muted-foreground">
            <MapPin size={18} className="inline mr-1 text-primary" />{" "}
            {tour.location}
          </span>

          <span className="flex items-center text-muted-foreground">
            <Calendar size={18} className="inline mr-1 text-primary" />{" "}
            {new Date(tour.startDate).toLocaleDateString()}
          </span>

          <span className="flex items-center text-muted-foreground col-span-2">
            <Users size={18} className="inline mr-1 text-primary" /> Up to{" "}
            {tour.maxCapacity} People
          </span>
        </div>

        <div className="flex items-end gap-2 pt-2">
          <div className="flex flex-col w-1/2">
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter leading-none mb-1">
              Starting from
            </span>
            <span className="text-2xl font-black text-foreground leading-none">
              <span className="text-sm font-bold text-muted-foreground mr-1">
                Rs.
              </span>
              {tour.pricePerAdult.toLocaleString()}
            </span>
          </div>

          <div className="flex gap-2 w-1/2">
            <Button
              size="icon"
              variant="outline"
              className="font-bold border border-border bg-muted dark:not-[:hover]:text-muted-foreground hover:border-transparent hover:bg-primary"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20} />
            </Button>

            <Button
              asChild
              className="flex-1 font-bold rounded-xl px-6"
              size="lg"
            >
              <Link href={`${NavigationUrls.TOURS}/${tour?.slug || tour?.id}`}>Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
