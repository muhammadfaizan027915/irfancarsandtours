import { CarListItemResponseDto } from "@icat/contracts";

export enum CarCartActionType {
  "AddToCart",
  "RemoveFromCart",
  "ClearCart",
}

export type CarCartState = {
  carsList: CarListItemResponseDto[];
};

export type CarCartAction =
  | {
      type: CarCartActionType.AddToCart;
      payload: CarListItemResponseDto;
    }
  | {
      type: CarCartActionType.RemoveFromCart;
      payload: CarListItemResponseDto["id"];
    }
  | {
      type: CarCartActionType.ClearCart;
    };

export type CarCartContextType = CarCartState &  {
  addToCart: (car: CarListItemResponseDto) => void
  removeFromCart: (id: CarListItemResponseDto['id']) => void
  clearCart: () => void
}
