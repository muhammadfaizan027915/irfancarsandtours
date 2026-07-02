"use client";

import { Building2, CarFront, Landmark, Sparkles } from "lucide-react";

import { Badge } from "@icat/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@icat/ui/components/card";

const imageFallback = 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f3f4f6%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%236b7280%22%20font-size%3D%2228%22%3EImage%20unavailable%3C/text%3E%3C/svg%3E';

const services = [
  {
    title: "Economical Car Rental",
    description:
      "Affordable and fuel-efficient rentals designed to keep your travel costs low without compromising comfort or reliability.",
    icon: <CarFront className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    tag: "Budget-friendly",
  },
  {
    title: "Luxury Rent a Car",
    description:
      "Premium cars for weddings, corporate events, and special occasions with a polished, comfortable ride.",
    icon: <Sparkles className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1200&q=80",
    tag: "Premium",
  },
  {
    title: "Corporate Fleet Service",
    description:
      "Flexible fleet outsourcing for companies that need dependable transport for staff and business travel.",
    icon: <Building2 className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1685091955352-4bb8796aef12?auto=format&fit=crop&w=1200&q=80",
    tag: "Business",
  },
  {
    title: "Van & Coaster Rentals",
    description:
      "Spacious group transport options for family trips, events, staff transfers, and day-long excursions.",
    icon: <Landmark className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1534011056808-50c1c6082fe7?auto=format&fit=crop&w=1200&q=80",
    tag: "Group travel",
  },
];

export function OurServices() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <Badge variant="accent" className="rounded-full px-3 py-1 text-sm">
          Our Services
        </Badge>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
          Tailored transport solutions for every journey.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          From economical city rides to premium events and corporate travel, we have a service that fits your needs.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {services.map((service, index) => (
          <Card
            key={service.title}
            className="group overflow-hidden gap-0 border-border/70 p-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  t.onerror = null;
                  t.src = imageFallback;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">
                0{index + 1}
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {service.icon}
                </span>
                {service.tag}
              </div>
            </div>

            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="text-sm leading-6 text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
