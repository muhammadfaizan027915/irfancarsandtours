import { after } from "next/server";

import {
  ComplaintResponseDto,
  ComplaintResponseSchema,
  GetComplaintsBodyDto,
  PaginatedComplaintResponseDto,
  PaginatedComplaintResponseSchema,
} from "@icat/contracts";
import { db, DbOrTransaction } from "@icat/database";
import {
  sendComplaintConfirmationEmail,
  sendComplaintCreatedAdminEmail,
  sendComplaintStatusUpdateEmail,
} from "@icat/lib/emails";
import { ComplaintRepository } from "@icat/repositories";

export class ComplaintService {
  private complaintRepository: ComplaintRepository;

  constructor() {
    this.complaintRepository = new ComplaintRepository();
  }

  async getAll(
    args: GetComplaintsBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<PaginatedComplaintResponseDto> {
    const result = await this.complaintRepository.findAll(args, tx);
    return PaginatedComplaintResponseSchema.parse(result);
  }

  async getComplaintById(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<ComplaintResponseDto | null> {
    const complaint = await this.complaintRepository.findById(id, tx);
    return complaint ? ComplaintResponseSchema.parse(complaint) : null;
  }

  async createComplaint(
    data: Omit<
      ComplaintResponseDto,
      "id" | "createdAt" | "updatedAt" | "status"
    >,
    tx: DbOrTransaction = db,
  ): Promise<ComplaintResponseDto> {
    const complaint = await this.complaintRepository.create(data, tx);
    const parsedComplaint = ComplaintResponseSchema.parse(complaint);

    after(
      Promise.all([
        sendComplaintCreatedAdminEmail({
          complaint: parsedComplaint,
        }),
        sendComplaintConfirmationEmail({
          complaint: parsedComplaint,
        }),
      ]),
    );

    return parsedComplaint;
  }

  async updateComplaint(
    id: string,
    data: Partial<Omit<ComplaintResponseDto, "id" | "createdAt" | "updatedAt">>,
    tx: DbOrTransaction = db,
  ): Promise<ComplaintResponseDto | null> {
    const complaint = await this.complaintRepository.update(id, data, tx);

    if (!complaint) return null;

    const parsedComplaint = ComplaintResponseSchema.parse(complaint);

    if (data.status) {
      after(
        sendComplaintStatusUpdateEmail({
          complaint: parsedComplaint,
        }),
      );
    }

    return parsedComplaint;
  }
}
