import { getTourById } from "@icat/web/data/tours";
import { getTourSeo } from "@icat/web/data/seo";
import { TourDetailContent } from "@icat/features/contents/tourdetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.name,
    image: tour.imageUrls ?? [],
    description: tour.description || `Book the ${tour.name} tour with Irfan Cars and Tours.`,
    brand: {
      "@type": "Brand",
      name: "Irfan Cars and Tours",
    },
    offers: {
      "@type": "Offer",
      price: tour.pricePerAdult,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `https://irfancarsandtours.com/tours/${id}`,
    },
  };

  return (
    <>
      <Script
        id={`json-ld-tour-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourDetailContent tourId={tour.id} />
    </>
  );
}

