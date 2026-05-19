"use server";

import { revalidatePath } from "next/cache";
import {
  ComplaintRequestBodyDto,
  ComplaintRequestBodySchema,
  UpdateComplaintStatusBodyDto,
  UpdateComplaintStatusBodySchema,
} from "@icat/contracts";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { ComplaintService } from "@icat/services";
import { handlerFormActionWithError } from "@icat/lib";
import { requireAdmin } from "@icat/lib/auth";

export const sendComplaint = handlerFormActionWithError({
  schema: ComplaintRequestBodySchema,
  action: async (data: ComplaintRequestBodyDto) => {
    const complaintService = new ComplaintService();
    const complaint = await complaintService.createComplaint(data);
    return complaint;
  },
});

export const updateComplaintStatus = handlerFormActionWithError({
  schema: UpdateComplaintStatusBodySchema,
  action: async (data: UpdateComplaintStatusBodyDto) => {
    await requireAdmin();

    const complaintService = new ComplaintService();
    const { id, ...updates } = data;
    const complaint = await complaintService.updateComplaint(id, updates);

    revalidatePath(DashboardNavigationUrls.COMPLAINTS);
    revalidatePath(`${DashboardNavigationUrls.COMPLAINTS}/${data.id}`);

    return complaint;
  },
});
