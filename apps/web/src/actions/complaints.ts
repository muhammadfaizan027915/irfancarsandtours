"use server";

import {
  ComplaintRequestBodyDto,
  ComplaintRequestBodySchema,
} from "@icat/contracts";
import { ComplaintService } from "@icat/services";
import {
  handlerFormActionWithError,
  handleServerActionWithError,
} from "@icat/lib";
import { revalidatePath } from "next/cache";

export const sendComplaint = handlerFormActionWithError({
  schema: ComplaintRequestBodySchema,
  action: async (data: ComplaintRequestBodyDto) => {
    const complaintService = new ComplaintService();
    const complaint = await complaintService.createComplaint(data);
    return complaint;
  },
});

export const deleteComplaint = handleServerActionWithError(async (id: string) => {
  const complaintService = new ComplaintService();
  await complaintService.deleteComplaint(id);
  revalidatePath("/dashboard/complaints");
});
