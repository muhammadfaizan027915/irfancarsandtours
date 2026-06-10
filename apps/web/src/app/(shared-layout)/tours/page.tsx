import { SecondaryHero } from "@icat/features/common/hero/secondary";
import {
  ToursContent,
  ToursContentSkeleton,
} from "@icat/features/contents/tours";
import { GetToursBodyDto } from "@icat/contracts";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@icat/ui/components/skeleton";

const Searchbar = dynamic(
  () => import("@icat/features/common/searchbar").then((m) => m.Searchbar),
  {
    loading: () => <Skeleton className="h-20 w-full rounded-xl" />,
  }
);

const ToursFiltersBar = dynamic(
  () => import("@icat/features/filtersbars").then((m) => m.ToursFiltersBar),
  {
    loading: () => <Skeleton className="h-[600px] w-full rounded-xl" />,
  }
);

type ToursPageProps = {
  searchParams: Promise<GetToursBodyDto>;
};

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const params = await searchParams;

  return (
    <>
      <SecondaryHero
        title="Discover Unforgettable Tours"
        subtitle="Explore the world with our curated tour packages and local experiences"
        badge="Sightseeing, Adventure, and Culture"
        heroImageUrl="/assets/hero_background_tour.jpg"
      />

      <div className="container mx-auto px-4 md:px-8">
        <Searchbar type="tours" {...params} />
      </div>

      <div className="container mx-auto flex flex-col gap-8 md:px-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl font-bold">Available Tours</h3>
          <p className="text-muted-foreground">
            Explore the world with our curated tour packages
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] items-start xl:gap-4">
          <div className="hidden xl:!block">
            <ToursFiltersBar />
          </div>
          <Suspense fallback={<ToursContentSkeleton />}>
            <ToursContent searchParams={params} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
