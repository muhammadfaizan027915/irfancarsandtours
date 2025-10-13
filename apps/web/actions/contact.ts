"use server";

import {
  ContactRequestBodyDto,
  ContactRequestBodySchema,
} from "@icat/contracts";
import { ContactService } from "@icat/services";
import { handlerFormActionWithError } from "@icat/lib";

export const sendMessage = handlerFormActionWithError({
  schema: ContactRequestBodySchema,
  action: async (data: ContactRequestBodyDto) => {
    const contactService = new ContactService();
    const contact = await contactService.createContact(data);
    return contact;
  },
});
