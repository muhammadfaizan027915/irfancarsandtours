import { ContactRepository } from "@icat/repositories";
import {
  ContactResponseDto,
  ContactResponseSchema,
  PaginatedContactResponseDto,
  PaginatedContactResponseSchema,
} from "@icat/contracts";

export class ContactService {
  private contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  async getAll(args: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedContactResponseDto> {
    const result = await this.contactRepository.findAll(args);
    return PaginatedContactResponseSchema.parse(result);
  }

  async getContactById(id: string): Promise<ContactResponseDto | null> {
    const contact = await this.contactRepository.findById(id);
    return contact ? ContactResponseSchema.parse(contact) : null;
  }

  async createContact(
    data: Omit<ContactResponseDto, "id" | "createdAt" | "updatedAt">
  ): Promise<ContactResponseDto> {
    const contact = await this.contactRepository.create(data);
    return ContactResponseSchema.parse(contact);
  }

  async deleteContact(id: string): Promise<ContactResponseDto | null> {
    const contact = await this.contactRepository.delete(id);
    return contact ? ContactResponseSchema.parse(contact) : null;
  }

  async hardDeleteContact(id: string): Promise<void> {
    await this.contactRepository.hardDelete(id);
  }
}
