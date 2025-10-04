import { useCallback } from "react";
import {
  CarCartAction,
  CarCartActionType,
  CarCartItem,
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

    case CarCartActionType.IncrementQuantity: {
      const updatedCarsList = state.carsList.map((car) => {
        if (car.id === action.payload.id) {
          return { ...car, quantity: car?.quantity + 1 };
        }

        return car;
      });

      return {
        ...state,
        carsList: updatedCarsList,
      };
    }

    case CarCartActionType.DecrementQuantity: {
      const updatedCarsList = state.carsList
        .map((car) => {
          if (car.id === action.payload.id) {
            return { ...car, quantity: car?.quantity - 1 };
          }

          return car;
        })
        .filter((car) => car?.quantity > 0);

      return {
        ...state,
        carsList: updatedCarsList,
      };
    }

    case CarCartActionType.ToggleDriver: {
      const updatedCarsList = state.carsList.map((car) => {
        if (car.id === action.payload.id) {
          return { ...car, bookedWithDriver: action.payload.bookedWithDriver };
        }

        return car;
      });

      return {
        ...state,
        carsList: updatedCarsList,
      };
    }

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
    (car: CarCartItem) => {
      dispatch({
        type: CarCartActionType.AddToCart,
        payload: { ...car, quantity: 1 },
      });
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: CarCartActionType.ClearCart });
  }, [dispatch]);

  const incrementQuantity = useCallback(
    (id: CarListItemResponseDto["id"]) => {
      dispatch({ type: CarCartActionType.IncrementQuantity, payload: { id } });
    },
    [dispatch]
  );

  const decrementQuantity = useCallback(
    (id: CarListItemResponseDto["id"]) => {
      dispatch({ type: CarCartActionType.DecrementQuantity, payload: { id } });
    },
    [dispatch]
  );

  const toggleDriver = useCallback(
    (id: CarListItemResponseDto["id"], bookedWithDriver: boolean) => {
      dispatch({
        type: CarCartActionType.ToggleDriver,
        payload: { id, bookedWithDriver },
      });
    },
    [dispatch]
  );

  return {
    ...state,
    addToCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    toggleDriver,
  };
}
