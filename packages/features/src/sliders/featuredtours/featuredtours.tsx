import { TourCard } from "@icat/features/tours";
import { SliderContainer } from "@icat/ui/components/slider-container";
import { getFeaturedTours } from "@icat/web/data/tours";

export async function FeaturedTours() {
  const tours = await getFeaturedTours();
  if (!tours?.length) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-3xl font-bold">Featured Tours</h3>
        <p className="text-muted-foreground">
          Explore our most popular and highly rated tours
        </p>
      </div>
      <SliderContainer>
        {tours?.map((tour) => (
          <TourCard key={tour?.id} tour={tour} />
        ))}
      </SliderContainer>
    </div>
  );
}
