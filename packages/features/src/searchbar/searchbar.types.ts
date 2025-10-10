import { BrandNames } from "@icat/database";

export type SearchType = "cars" | "tours";

export type BaseSearchbarProps = {
  type: "cars" | "tours";
};

export type CarSerachProps = BaseSearchbarProps & {
  search?: string;
  brand?: BrandNames;
};

export type TourSearchProps = BaseSearchbarProps & {
  destination?: string;
};

export type SearchbarProps = CarSerachProps & TourSearchProps;
