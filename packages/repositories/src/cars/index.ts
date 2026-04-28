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

import { CarWithSeoResponseDto,GetCarsBodyDto, RegisterCarBodyDto, UpdateCarBodyDto } from "@icat/contracts";
import {
  CarInsert,
  CarSelect,
  carsTable,
  db,
  SeoInsert,
  seoTable,
  Transaction,
} from "@icat/database";

import { SeoRepository } from "../seo";

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
  isFeatured: carsTable.isFeatured,
  forceWithDriver: carsTable.forceWithDriver,
  timesSearched: carsTable.timesSearched,
  createdAt: carsTable.createdAt,
  updatedAt: carsTable.updatedAt,
};

export class CarRepository {
  private seoRepository: SeoRepository;

  constructor() {
    this.seoRepository = new SeoRepository();
  }

  async findAll(args?: GetCarsBodyDto) {
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

    if (carType) {
      conditions.push(inArray(carsTable.carType, carType));
    }

    if (fuelType) {
      conditions.push(inArray(carsTable.fuelType, fuelType));
    }

    if (transmissionType) {
      conditions.push(inArray(carsTable.transmissionType, transmissionType));
    }

    if (amenities && amenities.length > 0) {
      conditions.push(arrayOverlaps(carsTable.amenities, amenities));
    }

    const whereClause = and(...conditions);

    const cars = await db
      .select(CarItemSelect)
      .from(carsTable)
      .where(whereClause)
      .orderBy(desc(carsTable.createdAt))
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
    const conditions = [
      isNull(carsTable.deletedAt),
      eq(carsTable.isFeatured, true),
    ];
    const whereClause = and(...conditions);
    return db.select(CarItemSelect).from(carsTable).where(whereClause);
  }

  async findMostSearched(limit = 10) {
    const conditions = [isNull(carsTable.deletedAt)];
    const whereClause = and(...conditions);
    return db
      .select(CarItemSelect)
      .from(carsTable)
      .where(whereClause)
      .orderBy(desc(carsTable.timesSearched))
      .limit(limit);
  }

  async findById(id: string): Promise<CarWithSeoResponseDto | null> {
    const rows = await db
      .select({
        car: carsTable,
        seo: seoTable,
      })
      .from(carsTable)
      .leftJoin(seoTable, eq(carsTable.seoId, seoTable.id))
      .where(and(eq(carsTable.id, id), isNull(carsTable.deletedAt)))
      .limit(1);

    if (rows.length === 0) return null;

    const { car, seo } = rows[0];
    return { ...car, seo } as unknown as CarWithSeoResponseDto;
  }

  async create(data: RegisterCarBodyDto): Promise<CarWithSeoResponseDto> {
    const { seo, ...carData } = data;

    return await db.transaction(async (tx: Transaction) => {
      let seoId: string | undefined;

      if (seo) {
        const newSeo = await this.seoRepository.create(seo as SeoInsert, tx);
        seoId = newSeo.id;
      }

      const [car] = await tx.insert(carsTable).values({
        ...carData,
        seoId,
      } as CarInsert).returning();

      // Return with SEO
      const rows = await tx
        .select({
          car: carsTable,
          seo: seoTable,
        })
        .from(carsTable)
        .leftJoin(seoTable, eq(carsTable.seoId, seoTable.id))
        .where(eq(carsTable.id, car.id))
        .limit(1);

      const { car: createdCar, seo: createdSeo } = rows[0];
      return { ...createdCar, seo: createdSeo } as unknown as CarWithSeoResponseDto;
    });
  }

  async update(
    id: string,
    data: UpdateCarBodyDto
  ): Promise<CarWithSeoResponseDto | null> {
    const { seo, id: _, ...carData } = data;

    return await db.transaction(async (tx: Transaction) => {
      const carResult = await tx
        .select({ seoId: carsTable.seoId })
        .from(carsTable)
        .where(eq(carsTable.id, id))
        .limit(1);

      let seoId = carResult[0]?.seoId;

      if (seo) {
        if (seoId) {
          await this.seoRepository.update(seoId, seo as Partial<SeoInsert>, tx);
        } else {
          const newSeo = await this.seoRepository.create(seo as SeoInsert, tx);
          seoId = newSeo.id;
        }
      }

      await tx
        .update(carsTable)
        .set({
          ...carData,
          seoId,
          updatedAt: new Date(),
        })
        .where(eq(carsTable.id, id));

      // Return updated with SEO
      const rows = await tx
        .select({
          car: carsTable,
          seo: seoTable,
        })
        .from(carsTable)
        .leftJoin(seoTable, eq(carsTable.seoId, seoTable.id))
        .where(eq(carsTable.id, id))
        .limit(1);

      if (rows.length === 0) return null;

      const { car: updatedCar, seo: updatedSeo } = rows[0];
      return { ...updatedCar, seo: updatedSeo } as unknown as CarWithSeoResponseDto;
    });
  }

  async findCarsDriverRules(carIds: string[]) {
    const cars = await db
      .select({
        id: carsTable.id,
        forceWithDriver: carsTable.forceWithDriver,
      })
      .from(carsTable)
      .where(inArray(carsTable.id, carIds));

    return cars;
  }

  async incrementTimesSearched(carIds: string[]) {
    await db
      .update(carsTable)
      .set({ timesSearched: sql`times_searched + 1` })
      .where(sql`${carsTable.id} in ${carIds}`);
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
