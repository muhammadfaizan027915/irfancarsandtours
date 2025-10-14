import { ArrowRight, Car } from "lucide-react";
import { Button } from "@icat/ui/components/button";
import { Card, CardContent } from "@icat/ui/components/card";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { LoginNoticeProps } from "./loginnotice.types";
import Link from "next/link";

export function LoginNotice({ tagline, ctaTitle }: LoginNoticeProps) {
  return (
    <Card className="w-full shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
          <Car className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold">Login Required</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tagline ??
            "You must be logged in to book a car. Please sign in to continue with your booking."}
        </p>
        <Button
          asChild
          className="w-full font-bold shadow-none group mt-2"
          size="lg"
        >
          <Link href={NavigationUrls.SIGNIN}>
            {ctaTitle ?? "Login to Continue"}{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
