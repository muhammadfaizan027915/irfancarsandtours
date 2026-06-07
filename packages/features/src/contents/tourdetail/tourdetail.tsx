import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { GetStarted } from "@icat/features/common/getstarted";
import { TourImages } from "@icat/features/sliders/tourimages";
import {
  TourBooking,
  TourDescription,
  TourInclusions,
  TourItinerary,
  TourProperties,
} from "@icat/features/tourdetail";
import { Badge } from "@icat/ui";
import { getTourById } from "@icat/web/data/tours";

type TourDetailProps = {
  tourId: string;
};

export async function TourDetailContent({ tourId }: TourDetailProps) {

const tour = await getTourById(tourId);

  if (!tour) {
    return notFound();
  }

  const _tours = [
    {
      tourId: tour.id,
      adultsNumber: 1,
      childrenNumber: 0,
    },
  ];

  return (
    <div className="grid gap-6">
      <TourImages imageUrls={tour?.imageUrls || []} />
      <div className="container mx-auto grid gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="px-3 py-1 uppercase tracking-wider text-[10px] font-bold"
            >
              {tour.location}
            </Badge>
            {tour.isFeatured && (
              <Badge
                variant="default"
                className="px-3 py-1 uppercase tracking-wider text-[10px] font-bold bg-primary"
              >
                Featured
              </Badge>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {tour.name}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-primary" />
              <span className="font-medium">{tour.meetingPoint}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 items-start gap-6">
          <div className="grid gap-6 col-span-6 lg:col-span-4">
            <TourProperties
              startDate={tour.startDate}
              maxCapacity={tour.maxCapacity}
              location={tour.location}
            />

            <TourDescription
              description={tour.description || "No description available"}
            />

            <TourItinerary itinerary={tour.itinerary} />

            <TourInclusions
              inclusions={tour.inclusions}
              exclusions={tour.exclusions}
            />
          </div>
          <div className="grid gap-6 col-span-6 lg:col-span-2">
            <GetStarted />
            <TourBooking tours={_tours} />
          </div>
        </div>
      </div>
    </div>
  );
}
