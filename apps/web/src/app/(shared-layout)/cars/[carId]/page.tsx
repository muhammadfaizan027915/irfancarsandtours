import { Suspense } from "react";
import {
  CarDetailContent,
  CarDetailContentSkeleton,
} from "@icat/features/contents/cardetail";
import { Metadata } from "next";
import { getCar } from "@icat/web/data/cars";
import { getCarSeo } from "@icat/web/data/seo";
import Script from "next/script";
import { notFound } from "next/navigation";

type CarDetailPageProps = {
  params: Promise<{ carId: string }>;
};

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = await getCar(carId);
  const seo = await getCarSeo(carId);

  if (!car) return {};

  const title = seo?.title || `${car.name} ${car.model} ${car.year}`;
  const description =
    seo?.description ||
    car.description ||
    `Rent ${car.name} ${car.model} ${car.year} from Irfan Cars and Tours.`;

  return {
    title,
    description,
    keywords: seo?.keywords?.join(", "),
    openGraph: {
      title,
      description,
      images: seo?.ogImage ? [seo.ogImage] : car.imageUrls,
    },
    alternates: {
      canonical: seo?.canonicalUrl || undefined,
    },
    robots: seo?.robots || "index, follow",
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { carId } = await params;
  const car = await getCar(carId);

  if (!car) {
    return notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${car.name} ${car.model} ${car.year}`,
    image: car.imageUrls,
    description:
      car.description ||
      `Rent ${car.name} ${car.model} ${car.year} from Irfan Cars and Tours.`,
    brand: {
      "@type": "Brand",
      name: car.name,
    },
    offers: {
      "@type": "Offer",
      price: car.startingPrice,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `https://irfancarsandtours.com/cars/${carId}`,
    },
  };

  return (
    <>
      <Script
        id={`json-ld-car-${carId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<CarDetailContentSkeleton />}>
        <CarDetailContent carId={carId} />
      </Suspense>
    </>
  );
}
