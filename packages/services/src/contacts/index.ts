import { ContactRepository } from "@icat/repositories";
import {
  ContactResponseDto,
  ContactResponseSchema,
  PaginatedContactResponseDto,
  PaginatedContactResponseSchema,
} from "@icat/contracts";

export class ContactService {
  private repo: ContactRepository;

  constructor() {
    this.repo = new ContactRepository();
  }

  async getAll(args: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedContactResponseDto> {
    const result = await this.repo.findAll(args);
    return PaginatedContactResponseSchema.parse(result);
  }

  async getContactById(id: string): Promise<ContactResponseDto | null> {
    const contact = await this.repo.findById(id);
    return contact ? ContactResponseSchema.parse(contact) : null;
  }

  async createContact(
    data: Omit<ContactResponseDto, "id" | "createdAt" | "updatedAt">
  ): Promise<ContactResponseDto> {
    const contact = await this.repo.create(data);
    return ContactResponseSchema.parse(contact);
  }

  async deleteContact(id: string): Promise<ContactResponseDto | null> {
    const contact = await this.repo.delete(id);
    return contact ? ContactResponseSchema.parse(contact) : null;
  }

  async hardDeleteContact(id: string): Promise<void> {
    await this.repo.hardDelete(id);
  }
}
