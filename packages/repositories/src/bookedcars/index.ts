import { and, eq, isNull } from "drizzle-orm";

import {
  BookedCarInsert,
  BookedCarSelect,
  bookedCarsTable,
  carsTable,
  db,
  DbOrTransaction,
} from "@icat/database";

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
  async create(
    data: BookedCarInsert,
    tx: DbOrTransaction = db,
  ): Promise<BookedCarSelect> {
    const [bookedcar] = await tx
      .insert(bookedCarsTable)
      .values(data)
      .returning();
    return bookedcar;
  }

  async findAll(tx: DbOrTransaction = db): Promise<BookedCarSelect[]> {
    return tx
      .select()
      .from(bookedCarsTable)
      .where(isNull(bookedCarsTable.deletedAt));
  }

  async findById(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<BookedCarSelect | undefined> {
    const [bookedcar] = await tx
      .select()
      .from(bookedCarsTable)
      .where(
        and(eq(bookedCarsTable.id, id), isNull(bookedCarsTable.deletedAt)),
      );

    return bookedcar;
  }

  async findByBookingIdWithCars(id: string, tx: DbOrTransaction = db) {
    const conditions = [
      isNull(bookedCarsTable.deletedAt),
      eq(bookedCarsTable.bookingId, id),
    ];

    const whereClause = and(...conditions);

    const bookedCars = await tx
      .select(BookedCarWithCarSelect)
      .from(bookedCarsTable)
      .leftJoin(carsTable, eq(carsTable.id, bookedCarsTable.carId))
      .where(whereClause);

    return bookedCars;
  }

  async update(
    id: string,
    data: Partial<BookedCarInsert>,
    tx: DbOrTransaction = db,
  ): Promise<BookedCarSelect | undefined> {
    const [updated] = await tx
      .update(bookedCarsTable)
      .set(data)
      .where(and(eq(bookedCarsTable.id, id), isNull(bookedCarsTable.deletedAt)))
      .returning();
    return updated;
  }

  async delete(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<BookedCarSelect | undefined> {
    const [deleted] = await tx
      .update(bookedCarsTable)
      .set({ deletedAt: new Date() })
      .where(and(eq(bookedCarsTable.id, id), isNull(bookedCarsTable.deletedAt)))
      .returning();
    return deleted;
  }
}
