import { TourResponseDto } from "@icat/contracts";

export type TourFormProps = {
  tour?: TourResponseDto;
  mode: "create" | "update";
};