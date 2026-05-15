import { CarResponseDto, SeoResponseDto } from "@icat/contracts";

export type CarFormProps = {
  mode: "create" | "update";
  car?: CarResponseDto;
};
