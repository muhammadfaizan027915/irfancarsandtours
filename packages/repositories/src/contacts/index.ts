import {
  db,
  contactsTable,
  ContactInsert,
  ContactSelect,
} from "@icat/database";
import { and, desc, ilike, isNull, sql, eq } from "drizzle-orm";

export const ContactListSelect = {
  id: contactsTable.id,
  name: contactsTable.name,
  email: contactsTable.email,
  phone: contactsTable.phone,
  message: contactsTable.message,
  createdAt: contactsTable.createdAt,
  updatedAt: contactsTable.updatedAt,
};

export class ContactRepository {
  async findAll(args: { page?: number; limit?: number; search?: string }) {
    const { page = 1, limit = 10, search } = args;

    const offset = (page - 1) * limit;
    const conditions = [isNull(contactsTable.deletedAt)];

    if (search) {
      conditions.push(
        ilike(contactsTable.name, `%${search}%`),
        ilike(contactsTable.email, `%${search}%`),
        ilike(contactsTable.phone, `%${search}%`),
        ilike(contactsTable.message, `%${search}%`)
      );
    }

    const whereClause = and(...conditions);

    const contacts = await db
      .select(ContactListSelect)
      .from(contactsTable)
      .where(whereClause)
      .orderBy(desc(contactsTable.createdAt))
      .limit(limit)
      .offset(offset);

    const [result] = await db
      .select({ total: sql<number>`count(*)` })
      .from(contactsTable)
      .where(whereClause);

    const total = contacts.length > 0 ? Number(result.total) : 0;

    return {
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async create(data: ContactInsert): Promise<ContactSelect> {
    const [contact] = await db.insert(contactsTable).values(data).returning();
    return contact;
  }

  async findById(id: string): Promise<ContactSelect | null> {
    const contact = await db.query.contactsTable.findFirst({
      where: eq(contactsTable.id, id),
    });
    return contact ?? null;
  }

  async delete(id: string): Promise<ContactSelect | null> {
    const [contact] = await db
      .update(contactsTable)
      .set({ deletedAt: new Date() })
      .where(eq(contactsTable.id, id))
      .returning();

    return contact ?? null;
  }

  async hardDelete(id: string): Promise<void> {
    await db.delete(contactsTable).where(eq(contactsTable.id, id));
  }
}
