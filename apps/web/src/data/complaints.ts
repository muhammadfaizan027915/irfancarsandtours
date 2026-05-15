import { ComplaintService } from "@icat/services";
import {
  GetComplaintsQueryDto,
  GetComplaintsQuerySchema,
} from "@icat/contracts";
import { requireAdmin } from "@icat/lib/auth";

export async function getComplaints(arg?: GetComplaintsQueryDto) {
  await requireAdmin();
  const args = GetComplaintsQuerySchema.parse(arg);
  const complaintService = new ComplaintService();
  const result = await complaintService.getAll(args);

  return result;
}
