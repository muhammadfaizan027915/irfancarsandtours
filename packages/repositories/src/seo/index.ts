import { eq } from "drizzle-orm";

import { db, SeoInsert, SeoSelect, seoTable, Transaction } from "@icat/database";

export class SeoRepository {
  async findById(id: string, tx: Transaction = db as any): Promise<SeoSelect | null> {
    const [result] = await tx.select().from(seoTable).where(eq(seoTable.id, id)).limit(1);
    return result ?? null;
  }

  async create(data: SeoInsert, tx: Transaction = db as any): Promise<SeoSelect> {
    const [result] = await tx.insert(seoTable).values(data).returning();
    return result;
  }

  async update(id: string, data: Partial<SeoInsert>, tx: Transaction = db as any): Promise<SeoSelect | null> {
    const [result] = await tx
      .update(seoTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(seoTable.id, id))
      .returning();
    return result ?? null;
  }

  async delete(id: string, tx: Transaction = db as any): Promise<void> {
    await tx.delete(seoTable).where(eq(seoTable.id, id));
  }
}
