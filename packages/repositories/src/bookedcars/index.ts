import {
  db,
  bookedCarsTable,
  BookedCarInsert,
  BookedCarSelect,
} from "@icat/database";

import { eq, and, isNull } from "drizzle-orm";

export class BookedCarsRepository {
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
