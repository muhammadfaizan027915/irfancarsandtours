import { PositionType } from "./common.types";

export const FlexToTextPositionMap: Record<
  PositionType,
  "left" | "right" | "center"
> = {
  start: "left",
  end: "right",
  center: "center",
};

export const CarPlaceHolderImageUrl = "/assets/car_placeholder.png"