import { useCallback } from "react";
import {
  CarCartAction,
  CarCartActionType,
  CarCartState,
} from "./carscart.types";
import { CarListItemResponseDto } from "@icat/contracts";
import { useCookieReducer } from "@icat/lib/hooks";

export const carCartKey = "CarsCart";

export const initialCarCartState: CarCartState = {
  carsList: [],
};

export function carCartReducer(state: CarCartState, action: CarCartAction) {
  switch (action.type) {
    case CarCartActionType.AddToCart: {
      const exists = state.carsList.some((car) => car.id === action.payload.id);
      if (exists) {
        return state;
      }
      return {
        ...state,
        carsList: [...state.carsList, action.payload],
      };
    }

    case CarCartActionType.RemoveFromCart:
      return {
        ...state,
        carsList: state.carsList.filter((car) => car.id !== action.payload),
      };

    case CarCartActionType.ClearCart:
      return initialCarCartState;

    default:
      return state;
  }
}

export function useCarCartReducer() {
  const [state, dispatch] = useCookieReducer(
    carCartKey,
    carCartReducer,
    initialCarCartState
  );

  const addToCart = useCallback(
    (car: CarListItemResponseDto) => {
      dispatch({ type: CarCartActionType.AddToCart, payload: car });
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    (id: CarListItemResponseDto["id"]) => {
      dispatch({ type: CarCartActionType.RemoveFromCart, payload: id });
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: CarCartActionType.ClearCart });
  }, [dispatch]);

  return {
    ...state,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
