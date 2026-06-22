import { and, eq, isNull } from "drizzle-orm";

import {
  BookedTourInsert,
  BookedTourSelect,
  bookedToursTable,
  db,
  DbOrTransaction,
  toursTable,
} from "@icat/database";

import { TourItemSelect } from "../tours";

export const BookedTourItemSelect = {
  id: bookedToursTable.id,
  tourBookingId: bookedToursTable.tourBookingId,
  tourId: bookedToursTable.tourId,
  adultsNumber: bookedToursTable.adultsNumber,
  childrenNumber: bookedToursTable.childrenNumber,
  quotedPricePerAdult: bookedToursTable.quotedPricePerAdult,
  quotedPricePerChild: bookedToursTable.quotedPricePerChild,
  createdAt: bookedToursTable.createdAt,
};

export const BookedTourWithTourSelect = {
  ...BookedTourItemSelect,
  tour: TourItemSelect,
};

export class BookedTourRepository {
  async create(
    data: BookedTourInsert,
    tx: DbOrTransaction = db,
  ): Promise<BookedTourSelect> {
    const [bookedtour] = await tx
      .insert(bookedToursTable)
      .values(data)
      .returning();
    return bookedtour;
  }

  async createMany(
    data: BookedTourInsert[],
    tx: DbOrTransaction = db,
  ): Promise<BookedTourSelect[]> {
    const bookedtours = await tx
      .insert(bookedToursTable)
      .values(data)
      .returning();
    return bookedtours;
  }

  async findAll(tx: DbOrTransaction = db): Promise<BookedTourSelect[]> {
    return tx
      .select()
      .from(bookedToursTable)
      .where(isNull(bookedToursTable.deletedAt));
  }

  async findById(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<BookedTourSelect | undefined> {
    const [bookedTour] = await tx
      .select()
      .from(bookedToursTable)
      .where(
        and(eq(bookedToursTable.id, id), isNull(bookedToursTable.deletedAt)),
      );

    return bookedTour;
  }

  async findManyByBookingId(id: string, tx: DbOrTransaction = db) {
    const conditions = [
      isNull(bookedToursTable.deletedAt),
      eq(bookedToursTable.tourBookingId, id),
    ];

    const whereClause = and(...conditions);

    const bookedTours = await tx
      .select(BookedTourWithTourSelect)
      .from(bookedToursTable)
      .leftJoin(toursTable, eq(toursTable.id, bookedToursTable.tourId))
      .where(whereClause);

    return bookedTours;
  }

  async update(
    id: string,
    data: Partial<BookedTourInsert>,
    tx: DbOrTransaction = db,
  ): Promise<BookedTourSelect | undefined> {
    const [updated] = await tx
      .update(bookedToursTable)
      .set(data)
      .where(and(eq(bookedToursTable.id, id), isNull(bookedToursTable.deletedAt)))
      .returning();
    return updated;
  }

  async delete(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<BookedTourSelect | undefined> {
    const [deleted] = await tx
      .update(bookedToursTable)
      .set({ deletedAt: new Date() })
      .where(and(eq(bookedToursTable.id, id), isNull(bookedToursTable.deletedAt)))
      .returning();
    return deleted;
  }
}
