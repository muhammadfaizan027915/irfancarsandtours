"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@icat/ui/components/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 px-4 md:px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Something went wrong
        </h1>
        <p className="text-muted-foreground text-lg max-w-[600px]">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => reset()} variant="outline" size="lg">
          Try again
        </Button>
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
