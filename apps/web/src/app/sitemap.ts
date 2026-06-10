import { MetadataRoute } from 'next'
import { db, carsTable, toursTable } from "@icat/database"
import { isNotNull, isNull, and } from "drizzle-orm"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_AUTH_URL as string;
  
  const cars = await db
    .select({ slug: carsTable.slug, updatedAt: carsTable.updatedAt })
    .from(carsTable)
    .where(and(isNull(carsTable.deletedAt), isNotNull(carsTable.slug)))

  const tours = await db
    .select({ slug: toursTable.slug, updatedAt: toursTable.updatedAt })
    .from(toursTable)
    .where(and(isNull(toursTable.deletedAt), isNotNull(toursTable.slug)))

  const carUrls: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: car.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const tourUrls: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: tour.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/complaints`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...carUrls,
    ...tourUrls,
  ]
}