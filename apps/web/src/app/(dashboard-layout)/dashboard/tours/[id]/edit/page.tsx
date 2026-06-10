import { TourForm } from "@icat/features/dashboard/forms/tour/tour";
import { SeoForm } from "@icat/features/dashboard/forms/seo";
import { getTourById } from "@icat/web/data/tours";
import { getTourSeo } from "@icat/web/data/seo";
import { notFound } from "next/navigation";

type EditTourPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTourPage({ params }: EditTourPageProps) {
  const { id } = await params;
  
  const [tour, seo] = await Promise.all([
    getTourById(id),
    getTourSeo(id),
  ]);

  if (!tour) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <TourForm tour={tour} mode="update" />
      <SeoForm tourId={tour.id} seo={seo} />
    </div>
  );
}
