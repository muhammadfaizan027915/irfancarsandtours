import {
  and,
  arrayOverlaps,
  desc,
  eq,
  ilike,
  inArray,
  isNull,
  sql,
} from "drizzle-orm";

import {
  Amenities,
  BrandNames,
  CarInsert,
  CarSelect,
  carsTable,
  CarTypes,
  db,
  DbOrTransaction,
  FuelTypes,
  TransmissionTypes,
} from "@icat/database";

export const CarItemSelect = {
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
  startingPrice: carsTable.startingPrice,
  isFeatured: carsTable.isFeatured,
  forceWithDriver: carsTable.forceWithDriver,
  timesSearched: carsTable.timesSearched,
  createdAt: carsTable.createdAt,
  updatedAt: carsTable.updatedAt,
};

export class CarRepository {
  async findAll(
    args?: {
      page?: number;
      limit?: number;
      search?: string;
      name?: string;
      model?: string;
      brand?: BrandNames;
      carType?: CarTypes[];
      fuelType?: FuelTypes[];
      transmissionType?: TransmissionTypes[];
      amenities?: Amenities[];
    },
    tx: DbOrTransaction = db,
  ) {
    const {
      page = 1,
      limit = 50,
      search,
      name,
      model,
      brand,
      carType,
      fuelType,
      transmissionType,
      amenities,
    } = args || {};

    const offset = (page - 1) * limit;
    const conditions = [isNull(carsTable.deletedAt)];

    if (search) {
      conditions.push(ilike(carsTable.name, `%${search}%`));
    }

    if (name) {
      conditions.push(ilike(carsTable.name, `%${name}%`));
    }

    if (model) {
      conditions.push(ilike(carsTable.model, `%${model}%`));
    }

    if (brand) {
      conditions.push(eq(carsTable.brand, brand));
    }

    if (carType && carType.length > 0) {
      conditions.push(inArray(carsTable.carType, carType));
    }

    if (fuelType && fuelType.length > 0) {
      conditions.push(inArray(carsTable.fuelType, fuelType));
    }

    if (transmissionType && transmissionType.length > 0) {
      conditions.push(inArray(carsTable.transmissionType, transmissionType));
    }

    if (amenities && amenities.length > 0) {
      conditions.push(arrayOverlaps(carsTable.amenities, amenities));
    }

    const whereClause = and(...conditions);

    const cars = await tx
      .select(CarItemSelect)
      .from(carsTable)
      .where(whereClause)
      .orderBy(desc(carsTable.createdAt))
      .limit(limit)
      .offset(offset);

    const [result] = await tx
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

  async findFeatured(tx: DbOrTransaction = db) {
    const conditions = [
      isNull(carsTable.deletedAt),
      eq(carsTable.isFeatured, true),
    ];
    const whereClause = and(...conditions);
    return tx.select(CarItemSelect).from(carsTable).where(whereClause);
  }

  async findMostSearched(limit = 10, tx: DbOrTransaction = db) {
    const conditions = [isNull(carsTable.deletedAt)];
    const whereClause = and(...conditions);
    return tx
      .select(CarItemSelect)
      .from(carsTable)
      .where(whereClause)
      .orderBy(desc(carsTable.timesSearched))
      .limit(limit);
  }

  async findById(id: string, tx: DbOrTransaction = db): Promise<CarSelect | null> {
    const [car] = await tx
      .select()
      .from(carsTable)
      .where(and(eq(carsTable.id, id), isNull(carsTable.deletedAt)))
      .limit(1);

    return car ?? null;
  }

  async create(
    data: Omit<CarInsert, "id" | "createdAt" | "updatedAt">,
    tx: DbOrTransaction = db,
  ): Promise<CarSelect> {
    const [car] = await tx
      .insert(carsTable)
      .values(data as CarInsert)
      .returning();
    return car;
  }
async update(
  id: string,
  data: Partial<Omit<CarInsert, "id" | "createdAt" | "updatedAt">>,
  tx: DbOrTransaction = db,
): Promise<CarSelect | null> {
  const [updatedCar] = await tx
    .update(carsTable)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(carsTable.id, id))
    .returning();

  return updatedCar ?? null;
}

  async findCarsDriverAndStartingPrice(carIds: string[], tx: DbOrTransaction = db) {
    const cars = await tx
      .select({
        id: carsTable.id,
        forceWithDriver: carsTable.forceWithDriver,
        startingPrice: carsTable.startingPrice,
      })
      .from(carsTable)
      .where(inArray(carsTable.id, carIds));

    return cars;
  }

  async incrementTimesSearched(carIds: string[], tx: DbOrTransaction = db) {
    await tx
      .update(carsTable)
      .set({ timesSearched: sql`times_searched + 1` })
      .where(inArray(carsTable.id, carIds));
  }

  async delete(id: string, tx: DbOrTransaction = db): Promise<CarSelect | null> {
    const [car] = await tx
      .update(carsTable)
      .set({ deletedAt: new Date() })
      .where(eq(carsTable.id, id))
      .returning();

    return car ?? null;
  }

  async hardDelete(id: string, tx: DbOrTransaction = db): Promise<void> {
    await tx.delete(carsTable).where(eq(carsTable.id, id));
  }
}
