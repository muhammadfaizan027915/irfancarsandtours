import { getTourById } from "@icat/web/data/tours";
import { getTourSeo } from "@icat/web/data/seo";
import { TourDetailContent } from "@icat/features/contents/tourdetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type TourDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: TourDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const tour = await getTourById(id);
  const seo = await getTourSeo(id);

  if (!tour) return {};

  const title = seo?.title || `${tour.name} - Irfan Cars and Tours`;
  const description =
    seo?.description ||
    tour.description ||
    `Book the ${tour.name} tour with Irfan Cars and Tours.`;

  const imageUrls = tour.imageUrls ?? [];
  return {
    title,
    description,
    keywords: seo?.keywords?.join(", ") || undefined,
    openGraph: {
      title,
      description,
      images: seo?.ogImage ? [seo.ogImage] : imageUrls,
    },
    alternates: {
      canonical: seo?.canonicalUrl || undefined,
    },
    robots: seo?.robots || "index, follow",
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { id } = await params;
  const tour = await getTourById(id);

  if (!tour) {
    notFound();
  }

  return <TourDetailContent tourId={tour.id} />;
}
