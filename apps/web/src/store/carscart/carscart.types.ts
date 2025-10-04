import { CarListItemResponseDto } from "@icat/contracts";

export enum CarCartActionType {
  "AddToCart",
  "ClearCart",
  "IncrementQuantity",
  "DecrementQuantity",
  "ToggleDriver",
}

export type CarCartItem = CarListItemResponseDto & {
  quantity: number;
  bookedWithDriver?: boolean;
};

export type CarCartState = {
  carsList: CarCartItem[];
};

export type CarCartAction =
  | {
      type: CarCartActionType.AddToCart;
      payload: CarCartItem;
    }
  | {
      type: CarCartActionType.ClearCart;
    }
  | {
      type: CarCartActionType.IncrementQuantity;
      payload: { id: CarCartItem["id"] };
    }
  | {
      type: CarCartActionType.DecrementQuantity;
      payload: { id: CarCartItem["id"] };
    }
  | {
      type: CarCartActionType.ToggleDriver;
      payload: { id: CarCartItem["id"]; bookedWithDriver: boolean };
    };

export type CarCartContextType = CarCartState & {
  addToCart: (car: CarCartItem) => void;
  clearCart: () => void;
  incrementQuantity: (id: CarCartItem["id"]) => void;
  decrementQuantity: (id: CarCartItem["id"]) => void;
  toggleDriver: (id: CarCartItem["id"], bookedWithDriver: boolean) => void;
};
