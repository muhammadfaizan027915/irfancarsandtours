import { eq } from "drizzle-orm";

import {
  carsTable,
  db,
  DbOrTransaction,
  SeoInsert,
  SeoSelect,
  seoTable,
} from "@icat/database";

export class SeoRepository {
  async findById(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<SeoSelect | null> {
    const [result] = await tx
      .select()
      .from(seoTable)
      .where(eq(seoTable.id, id))
      .limit(1);
    return result ?? null;
  }

  async findByCarId(
    carId: string,
    tx: DbOrTransaction = db,
  ): Promise<SeoSelect | null> {
    const car = await tx.query.carsTable.findFirst({
      where: eq(carsTable.id, carId),
      columns: { seoId: true },
    });

    if (!car || !car.seoId) return null;

    return this.findById(car.seoId, tx);
  }

  async upsert(
    id: string | null | undefined,
    data: Omit<SeoInsert, "id">,
    tx: DbOrTransaction = db,
  ): Promise<SeoSelect> {
    if (id) {
      const [updated] = await tx
        .update(seoTable)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(seoTable.id, id))
        .returning();
      return updated;
    } else {
      const [created] = await tx
        .insert(seoTable)
        .values(data as SeoInsert)
        .returning();
      return created;
    }
  }

  async delete(id: string, tx: DbOrTransaction = db): Promise<void> {
    await tx.delete(seoTable).where(eq(seoTable.id, id));
  }
}
