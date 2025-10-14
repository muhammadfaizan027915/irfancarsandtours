import { Card, CardContent } from "@icat/ui/components/card";
import { Car, Phone, Wallet, CheckCircle } from "lucide-react";

export function HowItWork() {
  const steps = [
    {
      title: "Make a Booking",
      description:
        "Choose your preferred car, date, and pickup location through our online platform.",
      icon: <Car className="w-8 h-8 text-primary" />,
    },
    {
      title: "Get a Call from Our Representative",
      description:
        "Our team will reach out to confirm your booking details and assist with any questions.",
      icon: <Phone className="w-8 h-8 text-primary" />,
    },
    {
      title: "Receive a Quote",
      description:
        "We’ll provide a transparent and competitive price tailored to your rental needs.",
      icon: <Wallet className="w-8 h-8 text-primary" />,
    },
    {
      title: "Confirm & Drive Away",
      description:
        "Once confirmed, your car will be ready for pickup — enjoy a smooth ride with us!",
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-16 space-y-2">
        <h2 className="text-xl text-muted-foreground uppercase">
          How It Works
        </h2>
        <p className="text-4xl font-semibold max-w-lg mx-auto">
          Quick steps to book and drive your car.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            className="flex flex-col items-center text-center space-y-4"
            key={index}
          >
            <div className="bg-primary/10 p-4 rounded-full">{step.icon}</div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
