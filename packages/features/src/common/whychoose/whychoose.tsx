import React from "react";
import { Badge } from "@icat/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@icat/ui/components/card";

const whyChooseItems = [
  {
    title: "Reliable comfort",
    description:
      "Modern, well-maintained cars with smooth pickup and a stress-free ride every time.",
    image:
      "https://images.unsplash.com/photo-1533630217389-3a5e4dff5683?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Wide fleet choice",
    description:
      "From compact city cars to premium SUVs, we have the perfect vehicle for every trip.",
    image:
      "https://images.unsplash.com/photo-1685091955352-4bb8796aef12?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Flexible pickup",
    description:
      "Convenient handover options and easy airport or city-center collection to fit your plans.",
    image:
      "https://images.unsplash.com/photo-1727893512947-8bdc773ceb02?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Trusted support",
    description:
      "Friendly, responsive service that helps you from booking to drop-off with confidence.",
    image:
      "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=900&q=80",
  },
];

export function WhyChoose() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <Badge variant="accent" className="rounded-full px-3 py-1 text-sm">
            Why choose us
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            A car hire experience built around comfort, value, and reliability.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            We combine a premium fleet, transparent pricing, and attentive support to make every journey smooth.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {whyChooseItems.map((item, index) => (
            <Card
              key={item.title}
              className="group overflow-hidden border-border/70 p-0 gap-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">
                  0{index + 1}
                </span>
              </div>
              <CardHeader className="px-5 pt-5">
                <CardTitle className="text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}