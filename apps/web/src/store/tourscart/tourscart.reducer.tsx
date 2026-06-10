import { useCallback } from "react";
import {
  TourCartAction,
  TourCartActionType,
  TourCartItem,
  TourCartState,
} from "./tourscart.types";
import { useCookieReducer } from "@icat/lib/hooks";

export const tourCartKey = "ToursCart";

export const initialTourCartState: TourCartState = {
  toursList: [],
};

export function tourCartReducer(state: TourCartState, action: TourCartAction) {
  switch (action.type) {
    case TourCartActionType.AddToCart: {
      const exists = state.toursList.some((tour) => tour.id === action.payload.id);
      if (exists) {
        return state;
      }

      return {
        ...state,
        toursList: [...state.toursList, action.payload],
      };
    }

    case TourCartActionType.RemoveFromCart: {
      return {
        ...state,
        toursList: state.toursList.filter((tour) => tour.id !== action.payload.id),
      };
    }

    case TourCartActionType.UpdateParticipants: {
      return {
        ...state,
        toursList: state.toursList.map((tour) => {
          if (tour.id === action.payload.id) {
            return { 
              ...tour, 
              adults: action.payload.adults, 
              children: action.payload.children 
            };
          }
          return tour;
        }),
      };
    }

    case TourCartActionType.ClearCart:
      return initialTourCartState;

    default:
      return state;
  }
}

export function useTourCartReducer() {
  const [state, dispatch] = useCookieReducer(
    tourCartKey,
    tourCartReducer,
    initialTourCartState
  );

  const addToCart = useCallback(
    (tour: TourCartItem) => {
      dispatch({
        type: TourCartActionType.AddToCart,
        payload: tour,
      });
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    (id: string) => {
      dispatch({
        type: TourCartActionType.RemoveFromCart,
        payload: { id },
      });
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: TourCartActionType.ClearCart });
  }, [dispatch]);

  const updateParticipants = useCallback(
    (id: string, adults: number, children: number) => {
      dispatch({
        type: TourCartActionType.UpdateParticipants,
        payload: { id, adults, children },
      });
    },
    [dispatch]
  );

  return {
    ...state,
    addToCart,
    removeFromCart,
    clearCart,
    updateParticipants,
  };
}
