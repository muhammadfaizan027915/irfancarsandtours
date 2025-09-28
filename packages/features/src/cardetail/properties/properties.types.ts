import { CarListItemResponseDto } from "@icat/contracts";

export type CarPropertiesProps = Pick<
  CarListItemResponseDto,
  "transmissionType" | "carType" | "fuelType" | "seatingCapacity"
>;
