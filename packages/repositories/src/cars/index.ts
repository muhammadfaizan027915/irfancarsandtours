import { db, carsTable, CarInsert, CarSelect } from "@icat/database";
import { and, desc, eq, ilike, isNull, sql } from "drizzle-orm";

export const CarListSelect = {
  id: carsTable.id,
  name: carsTable.name,
  model: carsTable.model,
  year: carsTable.year,
  brand: carsTable.brand,
  carType: carsTable.carType,
  fuelType: carsTable.fuelType,
  transmissionType: carsTable.transmissionType,
  imageUrls: carsTable.imageUrls,
  seatingCapacity: carsTable.seatingCapacity,
  isFeatured: carsTable.isFeatured,
  isAllowedBookingWithoutDriver: carsTable.isAllowedBookingWithoutDriver,
  timesSearched: carsTable.timesSearched,
  createdAt: carsTable.createdAt,
  updatedAt: carsTable.updatedAt
};

export class CarRepository {
  async findAll(args: { page?: number; limit?: number; search?: string }) {
    const { page = 1, limit = 10, search } = args;

    const offset = (page - 1) * limit;
    const conditions = [isNull(carsTable.deletedAt)];

    if (search) {
      conditions.push(ilike(carsTable.name, `%${search}%`));
    }

    const whereClause = and(...conditions);

    const cars = await db
      .select(CarListSelect)
      .from(carsTable)
      .where(whereClause)
      .limit(limit)
      .offset(offset);

    const [result] = await db
      .select({ total: sql<number>`count(*)` })
      .from(carsTable)
      .where(whereClause);

    const total = cars.length > 0 ? Number(result.total) : 0;

    return {
      data: cars,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findFeatured() {
    return db
      .select(CarListSelect)
      .from(carsTable)
      .where(eq(carsTable.isFeatured, true));
  }

  async findMostSearched(limit = 10) {
    return db
      .select(CarListSelect)
      .from(carsTable)
      .orderBy(desc(carsTable.timesSearched))
      .limit(limit);
  }

  async findById(id: string): Promise<CarSelect | null> {
    const car = await db.query.carsTable.findFirst({
      where: and(eq(carsTable.id, id), isNull(carsTable.deletedAt)),
    });

    return car ?? null;
  }

  async create(data: CarInsert): Promise<CarSelect> {
    const [car] = await db.insert(carsTable).values(data).returning();
    return car;
  }

  async update(
    id: string,
    data: Partial<CarInsert>
  ): Promise<CarSelect | null> {
    const [car] = await db
      .update(carsTable)
      .set(data)
      .where(eq(carsTable.id, id))
      .returning();

    return car ?? null;
  }

  async delete(id: string): Promise<CarSelect> {
    const [car] = await db
      .update(carsTable)
      .set({ deletedAt: new Date() })
      .where(eq(carsTable.id, id))
      .returning();

    return car ?? null;
  }

  async hardDelete(id: string): Promise<void> {
    await db.delete(carsTable).where(eq(carsTable.id, id));
  }
}
