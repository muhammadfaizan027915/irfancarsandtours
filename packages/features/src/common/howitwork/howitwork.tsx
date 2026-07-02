import { Car, CheckCircle, Phone, Wallet } from "lucide-react";

import { Badge } from "@icat/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@icat/ui/components/card";

export function HowItWork() {
  const steps = [
    {
      title: "Make a Booking",
      description:
        "Choose your preferred car, date, and pickup location through our online platform.",
      icon: <Car className="h-7 w-7 text-primary" />,
    },
    {
      title: "Get a Call from Our Representative",
      description:
        "Our team will reach out to confirm your booking details and assist with any questions.",
      icon: <Phone className="h-7 w-7 text-primary" />,
    },
    {
      title: "Receive a Quote",
      description:
        "We’ll provide a transparent and competitive price tailored to your rental needs.",
      icon: <Wallet className="h-7 w-7 text-primary" />,
    },
    {
      title: "Confirm & Drive Away",
      description:
        "Once confirmed, your car will be ready for pickup — enjoy a smooth ride with us!",
      icon: <CheckCircle className="h-7 w-7 text-primary" />,
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <Badge variant="accent" className="rounded-full px-3 py-1 text-sm">
          How It Works
        </Badge>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
          Quick steps to book and drive your car.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          A simple, secure process from booking to pickup.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border-border/70 text-center shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
          >
            <CardHeader className="items-center px-6 pt-6">
              <div className="absolute left-4 top-4 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                0{index + 1}
              </div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
                {step.icon}
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <CardTitle className="text-lg">{step.title}</CardTitle>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
