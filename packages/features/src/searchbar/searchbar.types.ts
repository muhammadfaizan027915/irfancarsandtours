export type SearchType = "cars" | "tours";

export type BaseSearchbarProps = {
  showTabs?: boolean;
};

export type CarSerachProps = BaseSearchbarProps & {
  defaultTab: "cars";
  pickupLocation?: string;
};

export type TourSearchProps = BaseSearchbarProps & {
  defaultTab: "tours";
  destination?: string;
};

export type SearchbarProps = CarSerachProps | TourSearchProps;
