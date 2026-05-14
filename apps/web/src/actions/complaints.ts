"use server";

import {
  ComplaintRequestBodyDto,
  ComplaintRequestBodySchema,
} from "@icat/contracts";
import { ComplaintService } from "@icat/services";
import { handlerFormActionWithError } from "@icat/lib";

export const sendComplaint = handlerFormActionWithError({
  schema: ComplaintRequestBodySchema,
  action: async (data: ComplaintRequestBodyDto) => {
    const complaintService = new ComplaintService();
    const complaint = await complaintService.createComplaint(data);
    return complaint;
  },
});
