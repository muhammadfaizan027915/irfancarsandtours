import "server-only";

import { and, desc, eq, gte, ilike, inArray,isNull, lte, or, sql } from "drizzle-orm";

import {
  db,
  DbOrTransaction,
  TourInsert,
  TourSelect,
  toursTable,
} from "@icat/database";

export const TourItemSelect = {
  id: toursTable.id,
  slug: toursTable.slug,
  name: toursTable.name,
  location: toursTable.location,
  meetingPoint: toursTable.meetingPoint,
  startDate: toursTable.startDate,
  pricePerAdult: toursTable.pricePerAdult,
  pricePerChild: toursTable.pricePerChild,
  maxCapacity: toursTable.maxCapacity,
  imageUrls: toursTable.imageUrls,
  isFeatured: toursTable.isFeatured,
  createdAt: toursTable.createdAt,
  updatedAt: toursTable.updatedAt,
};

export class TourRepository {
  async findAll(
    args?: {
      page?: number;
      limit?: number;
      search?: string;
      location?: string;
      isFeatured?: boolean;
      startDate?: Date;
      endDate?: Date;
      pricePerAdultMin?: number;
      pricePerAdultMax?: number;
      pricePerChildMin?: number;
      pricePerChildMax?: number;
      maxCapacity?: number;
    },
    tx: DbOrTransaction = db,
  ) {
    const {
      page = 1,
      limit = 50,
      search,
      location,
      isFeatured,
      startDate,
      endDate,
      pricePerAdultMin,
      pricePerAdultMax,
      pricePerChildMin,
      pricePerChildMax,
      maxCapacity,
    } = args || {};

    const offset = (page - 1) * limit;
    const conditions = [isNull(toursTable.deletedAt)];

    if (search) {
      conditions.push(ilike(toursTable.name, `%${search}%`));
    }

    if (location) {
      conditions.push(ilike(toursTable.location, `%${location}%`));
    }

    if (isFeatured) {
      conditions.push(eq(toursTable.isFeatured, isFeatured));
    }

    if (startDate) {
      conditions.push(gte(toursTable.startDate, new Date(startDate)));
    }

    if (endDate) {
      conditions.push(lte(toursTable.startDate, new Date(endDate)));
    }

    if (pricePerAdultMin) {
      conditions.push(gte(toursTable.pricePerAdult, pricePerAdultMin));
    }

    if (pricePerAdultMax) {
      conditions.push(lte(toursTable.pricePerAdult, pricePerAdultMax));
    }

    if (pricePerChildMin) {
      conditions.push(gte(toursTable.pricePerChild, pricePerChildMin));
    }

    if (pricePerChildMax) {
      conditions.push(lte(toursTable.pricePerChild, pricePerChildMax));
    }

    if (maxCapacity) {
      conditions.push(gte(toursTable.maxCapacity, maxCapacity));
    }

    const whereClause = and(...conditions);

    const [tours, [result]] = await Promise.all([
      tx
        .select(TourItemSelect)
        .from(toursTable)
        .where(whereClause)
        .orderBy(desc(toursTable.createdAt))
        .limit(limit)
        .offset(offset),
      tx
        .select({ total: sql<number>`count(*)` })
        .from(toursTable)
        .where(whereClause),
    ]);

    const total = tours.length > 0 ? Number(result.total) : 0;

    return {
      data: tours,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findFeatured(tx: DbOrTransaction = db) {
    const conditions = [
      isNull(toursTable.deletedAt),
      eq(toursTable.isFeatured, true),
    ];
    const whereClause = and(...conditions);
    return tx.select(TourItemSelect).from(toursTable).where(whereClause);
  }

  async findById(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<TourSelect | null> {
    const [tour] = await tx
      .select()
      .from(toursTable)
      .where(and(eq(toursTable.id, id), isNull(toursTable.deletedAt)))
      .limit(1);

    return tour ?? null;
  }

  async findByIdOrSlug(idOrSlug: string, tx: DbOrTransaction = db) {
    const [tour] = await tx
      .select()
      .from(toursTable)
      .where(
        and(
          or(eq(toursTable.id, idOrSlug), eq(toursTable.slug, idOrSlug)),
          isNull(toursTable.deletedAt)
        )
      )
      .limit(1);

    return tour ?? null;
  }

  async findBySlug(slug: string, tx: DbOrTransaction = db) {
    const [tour] = await tx
      .select()
      .from(toursTable)
      .where(and(eq(toursTable.slug, slug), isNull(toursTable.deletedAt)))
      .limit(1);

    return tour ?? null;
  }

  async getToursPricingsAndCapacity(id: string[], tx: DbOrTransaction = db) {
    const toursPricings = await tx
      .select({
        id: toursTable.id,
        name: toursTable.name,
        maxCapacity: toursTable.maxCapacity,
        pricePerAdult: toursTable.pricePerAdult,
        pricePerChild: toursTable.pricePerChild,
      })
      .from(toursTable)
      .where(and(inArray(toursTable.id, id), isNull(toursTable.deletedAt)));

    return toursPricings;
  }

  async create(
    data: Omit<TourInsert, "id" | "createdAt" | "updatedAt">,
    tx: DbOrTransaction = db,
  ): Promise<TourSelect> {
    const [tour] = await tx
      .insert(toursTable)
      .values(data as TourInsert)
      .returning();
    return tour;
  }

  async update(
    id: string,
    data: Partial<Omit<TourInsert, "id" | "createdAt" | "updatedAt">>,
    tx: DbOrTransaction = db,
  ): Promise<TourSelect | null> {
    const [updatedTour] = await tx
      .update(toursTable)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(toursTable.id, id))
      .returning();

    return updatedTour ?? null;
  }

  async delete(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<TourSelect | null> {
    const [tour] = await tx
      .update(toursTable)
      .set({ deletedAt: new Date() })
      .where(eq(toursTable.id, id))
      .returning();

    return tour ?? null;
  }

  async hardDelete(id: string, tx: DbOrTransaction = db): Promise<void> {
    await tx.delete(toursTable).where(eq(toursTable.id, id));
  }
}
