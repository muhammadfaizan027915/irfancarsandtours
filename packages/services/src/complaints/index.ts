import { ComplaintRepository } from "@icat/repositories";
import {
  ComplaintResponseDto,
  ComplaintResponseSchema,
  GetComplaintsQueryDto,
  PaginatedComplaintResponseDto,
  PaginatedComplaintResponseSchema,
} from "@icat/contracts";

export class ComplaintService {
  private complaintRepository: ComplaintRepository;

  constructor() {
    this.complaintRepository = new ComplaintRepository();
  }

  async getAll(
    args: GetComplaintsQueryDto
  ): Promise<PaginatedComplaintResponseDto> {
    const result = await this.complaintRepository.findAll(args);
    return PaginatedComplaintResponseSchema.parse(result);
  }

  async getComplaintById(id: string): Promise<ComplaintResponseDto | null> {
    const complaint = await this.complaintRepository.findById(id);
    return complaint ? ComplaintResponseSchema.parse(complaint) : null;
  }

  async createComplaint(
    data: Omit<ComplaintResponseDto, "id" | "createdAt" | "updatedAt">
  ): Promise<ComplaintResponseDto> {
    const complaint = await this.complaintRepository.create(data);
    return ComplaintResponseSchema.parse(complaint);
  }

  async deleteComplaint(id: string): Promise<ComplaintResponseDto | null> {
    const complaint = await this.complaintRepository.delete(id);
    return complaint ? ComplaintResponseSchema.parse(complaint) : null;
  }

  async hardDeleteComplaint(id: string): Promise<void> {
    await this.complaintRepository.hardDelete(id);
  }
}
