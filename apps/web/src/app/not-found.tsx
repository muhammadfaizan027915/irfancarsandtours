import { Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@icat/ui/components/button";

export default function NotFoundPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 px-4 md:px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">
          404
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Page not found
        </h2>
        <p className="text-muted-foreground text-lg max-w-[600px]">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      <Button asChild size="lg">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
