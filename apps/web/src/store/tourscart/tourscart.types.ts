import { TourListItemResponseDto } from "@icat/contracts";

export enum TourCartActionType {
  "AddToCart",
  "RemoveFromCart",
  "ClearCart",
  "UpdateParticipants",
}

export type TourCartItem = TourListItemResponseDto & {
  adults: number;
  children: number;
};

export type TourCartState = {
  toursList: TourCartItem[];
};

export type TourCartAction =
  | {
      type: TourCartActionType.AddToCart;
      payload: TourCartItem;
    }
  | {
      type: TourCartActionType.RemoveFromCart;
      payload: { id: string };
    }
  | {
      type: TourCartActionType.ClearCart;
    }
  | {
      type: TourCartActionType.UpdateParticipants;
      payload: { id: string; adults: number; children: number };
    };

export type TourCartContextType = TourCartState & {
  addToCart: (tour: TourCartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateParticipants: (id: string, adults: number, children: number) => void;
};
