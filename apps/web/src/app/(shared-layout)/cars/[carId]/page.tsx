import { Suspense } from "react";
import {
  CarDetailContent,
  CarDetailContentSkeleton,
} from "@icat/features/contents/cardetail";
import { Metadata } from "next";
import { getCar } from "@icat/web/data/cars";
import { getCarSeo } from "@icat/web/data/seo";

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

  return (
    <Suspense fallback={<CarDetailContentSkeleton />}>
      <CarDetailContent carId={carId} />
    </Suspense>
  );
}
