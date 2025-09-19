import { CarResponseDto } from "@icat/contracts";

export type CarFormProps = {
  mode: "create" | "update";
  defaultValues?: CarResponseDto;
};
