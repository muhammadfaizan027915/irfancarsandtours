import { Card, CardHeader } from "@icat/ui/components/card";
import { Button } from "@icat/ui/components/button";
import { ArrowRight } from "lucide-react";

export function CarGetStarted() {
  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <h1 className="text-start text-2xl font-bold">Get Started</h1>
        <Button size={"lg"} className="font-bold shadow-none group mt-2">
          Book through call
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardHeader>
    </Card>
  );
}
