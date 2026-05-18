import { ComplaintService } from "@icat/services";
import {
  GetComplaintsBodyDto,
  GetComplaintsBodySchema,
} from "@icat/contracts";
import { requireAdmin } from "@icat/lib/auth";

export async function getComplaints(arg?: GetComplaintsBodyDto) {
  await requireAdmin();
  const args = GetComplaintsBodySchema.parse(arg);
  const complaintService = new ComplaintService();
  const result = await complaintService.getAll(args);

  return result;
}
