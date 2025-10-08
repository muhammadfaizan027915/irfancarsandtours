import {
  db,
  bookedCarsTable,
  BookedCarInsert,
  BookedCarSelect,
  carsTable,
} from "@icat/database";

import { eq, and, isNull } from "drizzle-orm";
import { CarItemSelect } from "../cars";

export const BookedCarItemSelect = {
  id: bookedCarsTable.id,
  quotedPrice: bookedCarsTable.quotedPrice,
  bookedWithDriver: bookedCarsTable.bookedWithDriver,
  quantity: bookedCarsTable.quantity,
  createdAt: bookedCarsTable.createdAt,
};

export const BookedCarWithCarSelect = {
  ...BookedCarItemSelect,
  car: CarItemSelect,
};

export class BookedCarRepository {
  async create(data: BookedCarInsert): Promise<BookedCarSelect> {
    const [bookedcar] = await db
      .insert(bookedCarsTable)
      .values(data)
      .returning();
    return bookedcar;
  }

  async findAll(): Promise<BookedCarSelect[]> {
    return db
      .select()
      .from(bookedCarsTable)
      .where(isNull(bookedCarsTable.deletedAt));
  }

  async findById(id: string): Promise<BookedCarSelect | undefined> {
    const [bookedcar] = await db
      .select()
      .from(bookedCarsTable)
      .where(
        and(eq(bookedCarsTable.id, id), isNull(bookedCarsTable.deletedAt))
      );

    return bookedcar;
  }

  async findByBookingIdWithCars(id: string) {
    const conditions = [
      isNull(bookedCarsTable.deletedAt),
      eq(bookedCarsTable.bookingId, id),
    ];

    const whereClause = and(...conditions);

    const bookedCars = await db
      .select(BookedCarWithCarSelect)
      .from(bookedCarsTable)
      .leftJoin(carsTable, eq(carsTable.id, bookedCarsTable.carId))
      .where(whereClause);

    return bookedCars;
  }

  async update(
    id: string,
    data: Partial<BookedCarInsert>
  ): Promise<BookedCarSelect | undefined> {
    const [updated] = await db
      .update(bookedCarsTable)
      .set(data)
      .where(and(eq(bookedCarsTable.id, id), isNull(bookedCarsTable.deletedAt)))
      .returning();
    return updated;
  }

  async delete(id: string): Promise<BookedCarSelect | undefined> {
    const [deleted] = await db
      .update(bookedCarsTable)
      .set({ deletedAt: new Date() })
      .where(and(eq(bookedCarsTable.id, id), isNull(bookedCarsTable.deletedAt)))
      .returning();
    return deleted;
  }
}
